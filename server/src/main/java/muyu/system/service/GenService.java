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
import muyu.system.common.utils.ExtendUtils;
import muyu.system.dao.GenDao;
import muyu.system.entity.Table;
import muyu.system.entity.TableColumn;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.Case;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.lang.reflect.Array;
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

            String dir = packageName.replace(".","/");
            this.packageMap.put("entityPakage",dir+"/entity");
            this.packageMap.put("daoPakage",dir+"/dao");
            this.packageMap.put("webPakage",dir+"/web");
            this.packageMap.put("servicePakage",dir+"/service");

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
        return genCode(request,batchBean);
    }


    public ResultBean<Table> genCode(HttpServletRequest request,SubmitBatchBean<Table,TableColumn> batchBean) throws IOException, TemplateModelException {
        Table table             = batchBean.getData();
        Configuration cfg       = new Configuration(Configuration.VERSION_2_3_23);
        String tplBasePath      = "classpath:/templates/normal/";
        String baseDir          = "src/main/java/";

        GenConfiguration gen = new GenConfiguration(
                StringUtils.split(this.getClass().getPackage().getName(),".")[0]+"."+ table.getPackageName(),
                batchBean.getData(),
                batchBean.getList());

        /*创建包目录*/
        gen.getPackageMap().forEach((key,dir)->{
            String dirName = baseDir+ dir;
            System.out.println("创建目录:"+dirName);
            File file = new File(dirName);
            if(!file.exists() && !file.mkdirs()){
                System.out.println("创建目录失败:"+dirName);
            }
        });

        ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        System.out.println("tplBasePath:"+tplBasePath);
        Resource resource = resolver.getResource(tplBasePath);

        cfg.setDirectoryForTemplateLoading(resource.getFile());
        cfg.setDefaultEncoding("UTF-8");
        cfg.setSharedVariable("list"    ,gen.getList());

        List<TableColumn> list = gen.getList();
        /*去除父类中已有的属性*/
        List<TableColumn> columnList  = new ArrayList<>();
        Class<?> clz;
        if(gen.getType()==0){
            clz = DataEntity.class;
            cfg.setSharedVariable("pClass"   ,"DataEntity");

        }else{
            clz = TreeEntity.class;
            cfg.setSharedVariable("pClass"   ,"TreeEntity");
        }

        Field[] fields = clz.getDeclaredFields();
        HashSet filedSet = new HashSet();
        HashSet packages = new HashSet();
        for(Field field:fields){
            filedSet.add(field.getName());
        }

        for(TableColumn column : list){
            if(!filedSet.contains(column.getJavaFiled())){
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

        cfg.setSharedVariable("packages"   ,packages);
        cfg.setSharedVariable("columnList" ,columnList);
        cfg.setSharedVariable("createDate" ,new Date());
        cfg.setSharedVariable("entityName" ,gen.getEntityName());
        cfg.setSharedVariable("packageName",gen.getPackageName());

        HashMap weaponMap = new HashMap();

        Template template = cfg.getTemplate("entity_tpl.ftl");
        String fileName =baseDir+gen.getPackageMap().get("entityPakage")+"/"+gen.getEntityName()+".java";
        File entity = new File(fileName);
        if(!entity.exists() && !entity.createNewFile()){
            System.out.println("创建实体文件失败:"+fileName);
        }

        try (OutputStream out = new FileOutputStream(entity)) {
            Writer writer = new OutputStreamWriter(out, "UTF-8");

            template.process(weaponMap,writer);
        } catch (TemplateException e) {
            e.printStackTrace();
        }

        return  new ResultBean<>("生成代码成功",true);
    }
}
