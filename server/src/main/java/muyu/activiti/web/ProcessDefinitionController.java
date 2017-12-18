package muyu.activiti.web;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.ResultPageBean;
import muyu.system.web.BaseController;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.ProcessDefinition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by liuruijie on 2017/4/20.
 * 模型管理
 */
@RestController
@RequestMapping("${prefixPath}/processDef/")
public class ProcessDefinitionController extends BaseController {

    @Autowired
    RepositoryService repositoryService;

    @RequestMapping("get")
    public ResultBean<ProcessDefinition> get(ProcessDefinition processDefinition) {
        return  new ResultBean<>((repositoryService.createProcessDefinitionQuery().processDefinitionId(processDefinition.getId()).singleResult()));
    }

    @RequestMapping("findPage")
    public ResultPageBean<ProcessDefinition> findPage(HttpServletRequest request) {
        ResultPageBean<ProcessDefinition> bean = new ResultPageBean<>(request);
        List<ProcessDefinition> list = repositoryService.createProcessDefinitionQuery().listPage( bean.getPageSize()*(bean.getPageNum()-1),bean.getPageSize());

        bean.setList(list);
        return bean;
    }

    @RequestMapping("delete")
    public ResultBean<ProcessDefinition> delete(ProcessDefinition processDefinition){
        repositoryService.deleteDeployment(processDefinition.getDeploymentId());
        return new ResultBean<>("删除流程成功",true);
    }
}
