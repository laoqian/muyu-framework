package muyu.system.web;

import freemarker.template.TemplateException;
import freemarker.template.TemplateModelException;
import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.ResultPageBean;
import muyu.system.common.beans.SubmitBatchBean;
import muyu.system.common.service.BaseService;
import muyu.system.entity.Table;
import muyu.system.entity.TableColumn;
import muyu.system.entity.Menu;
import muyu.system.service.GenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.Set;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/26
 * @version: 1.0.0
 */

@RestController
@RequestMapping("${prefixPath}/gen/")
public class GenController extends BaseService{

    @Autowired
    private GenService genService;


    @RequestMapping("findPage")
    ResultPageBean<Table> findPage(HttpServletRequest request,Table table) {

        return genService.findPage(request,table);
    }

    @RequestMapping("findTableColumn")
    ResultPageBean<List> findTableColumn(HttpServletRequest request,TableColumn table){
        return genService.findTableColumn(request,table);
    }

    @RequestMapping("getTableList")
    ResultBean<Set> getTableList(){
        return genService.getTableList();
    }

    @RequestMapping("saveBatch")
    public ResultBean<Table> saveBatch(@RequestBody SubmitBatchBean<Table,TableColumn> batchBean,HttpServletRequest request) throws IOException, TemplateException {
        return genService.saveBatch(request,batchBean);
    }
}
