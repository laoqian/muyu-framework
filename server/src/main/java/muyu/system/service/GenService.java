package muyu.system.service;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.TemplateModelException;
import lombok.Data;
import lombok.NoArgsConstructor;
import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.ResultPageBean;
import muyu.system.common.beans.SubmitBatchBean;
import muyu.system.common.persistence.DataEntity;
import muyu.system.common.persistence.TreeEntity;
import muyu.system.common.service.CrudService;
import muyu.system.utils.ExtendUtils;
import muyu.system.utils.IdUtils;
import muyu.system.dao.GenDao;
import muyu.system.dao.TableColumnDao;
import muyu.system.entity.Table;
import muyu.system.entity.TableColumn;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.util.*;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/15
 * @version: 1.0.0
 */

@Service
@Transactional
public class GenService extends CrudService<GenDao,Table>{

    @Autowired
    TableColumnDao tableColumnDao;

    @NoArgsConstructor
    @Data
    class GenConfiguration{
        String packageName;
        String entityName;
        Integer type;
        Table table;
        List<TableColumn> list;
        Map<String,String> packageMap = new HashMap<>();

        GenConfiguration(String packageName,Table table,List<TableColumn> list) {
            this.packageName = packageName;
            this.table = table;
            this.list = list;

            String dir = "./src/main/java/"+packageName.replace(".","/");
            this.packageMap.put("entityPakage",dir+"/entity");
            this.packageMap.put("daoPakage",dir+"/dao");
            this.packageMap.put("controllerPakage",dir+"/web");
            this.packageMap.put("servicePakage",dir+"/service");
            this.packageMap.put("xml","./src/main/resources/"+table.getPackageName());

            int pos = StringUtils.indexOf(table.getName(),'_');
            if(pos>0){
                this.entityName = table.getName().substring(pos);
            }else{
                this.entityName = table.getName();
            }

            this.entityName = ExtendUtils.underline2Camel(this.entityName,false);
            this.type  = this.table.getType();
        }

    }

    public ResultBean<Set> getTableList(){
        return new ResultBean<>(dao.getTableList());
    }


    public ResultPageBean<List> findTableColumn(HttpServletRequest request,TableColumn tableColumn){
        ResultPageBean bean = new ResultPageBean(request);

        if(StringUtils.isBlank(tableColumn.getName()) || StringUtils.isBlank(tableColumn.getGenTableId())){

            List<TableColumn> list  =dao.findTableColumn(tableColumn);
            int i =1;
            for (TableColumn column : list) {
                column.setSort(10*i++);
            }

            bean.setList(list);
        }
        return bean;
    }


    public ResultBean<Table> saveBatch(HttpServletRequest request,SubmitBatchBean<Table,TableColumn> batchBean) throws IOException, TemplateException {
        Table table = batchBean.getData();
        List<TableColumn> list  = batchBean.getList();
        TableColumn query = new TableColumn();
        super.save(table);
        query.setGenTableId(table.getId());
        tableColumnDao.deleteByQuery(query);
        list.forEach(tableColumn ->{
            tableColumn.setGenTableId(table.getId());
            tableColumn.preInsert();
            tableColumn.setId(IdUtils.genId());
            tableColumnDao.insert(tableColumn);
        });

        switch (table.getGenType()){
            case 1:
                genServerCode(request,batchBean);
                break;
            case 2:
                genClientCode(request,batchBean);
                break;
            case 3:
                genServerCode(request,batchBean);
                genClientCode(request,batchBean);
        }

        return new ResultBean<>();
    }

    private void genClientCode(HttpServletRequest request, SubmitBatchBean<Table, TableColumn> batchBean) throws IOException, TemplateModelException {

    }

    private void genServerCode(HttpServletRequest request, SubmitBatchBean<Table, TableColumn> batchBean) throws IOException, TemplateModelException {
        Table table             = batchBean.getData();
        Configuration cfg       = new Configuration(Configuration.VERSION_2_3_23);
        String tplBasePath;


        GenConfiguration gen = new GenConfiguration(
                StringUtils.split(this.getClass().getPackage().getName(),".")[0]+"."+ table.getPackageName(),
                batchBean.getData(),
                batchBean.getList());

        /*创建包目录*/
        gen.getPackageMap().forEach((key,dir)->{
            System.out.println("创建目录:"+dir);
            File file = new File(dir);
            if(!file.exists() && !file.mkdirs()){
                System.out.println("创建目录失败:"+dir);
            }
        });

        cfg.setDefaultEncoding("UTF-8");
        cfg.setSharedVariable("list"    ,gen.getList());

        List<TableColumn> list = gen.getList();
        /*去除父类中已有的属性*/
        List<TableColumn> columnList  = new ArrayList<>();
        Class<?> clz;
        if(gen.getType()==0){
            tplBasePath = "classpath:/templates/normal/";
            clz = DataEntity.class;
            cfg.setSharedVariable("pClass"   ,"DataEntity");

        }else{
            tplBasePath = "classpath:/templates/tree/";
            clz = TreeEntity.class;
            cfg.setSharedVariable("pClass"   ,"TreeEntity");
        }


        System.out.println("tplBasePath:"+tplBasePath);
        ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        Resource resource = resolver.getResource(tplBasePath);
        cfg.setDirectoryForTemplateLoading(resource.getFile());

        Field[] fields = clz.getDeclaredFields();
        HashSet filedSet = new HashSet();
        HashSet packages = new HashSet();
        for(Field field:fields){
            filedSet.add(field.getName());
        }

        for(TableColumn column : list){
            if(!filedSet.contains(column.getJavaField())){
                columnList.add(column);
            }
            Class<?> c = null;
            switch (column.getJavaType()){
                case "Date":
                    c = Date.class;
                    break;

                case "BigDecimal" :
                    c = BigDecimal.class;
                    break;
                case "String" :
                case "Integer":
                case "Double" :
                case "Boolean" :
                    break;
                default:
                    try {
                        c = Class.forName(column.getJavaType());
                    } catch (ClassNotFoundException e) {
                        e.printStackTrace();
                        logger.error("找不到类："+column.getJavaType());
                    }

            }

            if(c != null){
                packages.add(c.getName());
            }
        }

        cfg.setSharedVariable("tableName"       ,table.getName());
        cfg.setSharedVariable("packages"        ,packages);
        cfg.setSharedVariable("columnList"      ,columnList);
        cfg.setSharedVariable("list"            ,list);
        cfg.setSharedVariable("createDate"      ,new Date());
        cfg.setSharedVariable("packageName"     ,gen.getPackageName());
        cfg.setSharedVariable("entityName"      ,gen.getEntityName());
        cfg.setSharedVariable("daoName"         ,gen.getEntityName()+"Dao");
        cfg.setSharedVariable("serviceName"     ,gen.getEntityName()+"Service");
        cfg.setSharedVariable("controllerName"  ,gen.getEntityName()+"Controller");

        HashMap weaponMap = new HashMap();

        String entityFileName = gen.getPackageMap().get("entityPakage")+"/"+gen.getEntityName()+".java";
        String daoFileName = gen.getPackageMap().get("daoPakage")+"/"+cfg.getSharedVariable("daoName")+".java";
        String serviceFileName = gen.getPackageMap().get("servicePakage")+"/"+cfg.getSharedVariable("serviceName")+".java";
        String controllerFileName = gen.getPackageMap().get("controllerPakage")+"/"+cfg.getSharedVariable("controllerName")+".java";
        String xmlFileName = gen.getPackageMap().get("xml")+"/"+cfg.getSharedVariable("daoName")+".xml";

        genFile(cfg,"entity",entityFileName,weaponMap);
        genFile(cfg,"dao",daoFileName,weaponMap);
        genFile(cfg,"service",serviceFileName,weaponMap);
        genFile(cfg,"controller",controllerFileName,weaponMap);
        System.out.println(xmlFileName);
        genFile(cfg,"dao_xml",xmlFileName,weaponMap);
    }

    private void  genFile(Configuration cfg,String tplName,String fileName,Map varMap) throws IOException{
                /*生成实体*/
        File file = new File(fileName);
        if(!file.exists() && !file.createNewFile()){
            System.out.println("创建文件失败:"+fileName);
        }

        Template template = cfg.getTemplate(tplName+"_tpl.ftl");

        try (OutputStream out = new FileOutputStream(file)) {
            Writer writer = new OutputStreamWriter(out, "UTF-8");

            template.process(varMap,writer);
        } catch (TemplateException e){
            e.printStackTrace();
        }
    }

}
