package muyu.activiti.service;

import muyu.activiti.entity.ProcessDef;
import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.ResultPageBean;
import muyu.system.common.service.BaseService;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.impl.persistence.entity.ProcessDefinitionEntity;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.ProcessDefinition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/12/19
 * @version: 1.0.0
 */

@Service
public class ProcessService extends BaseService{

    @Autowired
    RepositoryService repositoryService;


    public ResultBean<ProcessDefinition> get(ProcessDefinition processDefinition) {
        return  new ResultBean<>((repositoryService.createProcessDefinitionQuery().processDefinitionId(processDefinition.getId()).singleResult()));
    }

    public ResultBean<ProcessDefinition> delete(ProcessDefinition processDefinition){
        repositoryService.deleteDeployment(processDefinition.getDeploymentId());
        return new ResultBean<>("删除流程成功",true);
    }

    public ResultPageBean<ProcessDef> findPage(HttpServletRequest request){
        ResultPageBean<ProcessDef> bean = new ResultPageBean<>(request);
        List<ProcessDefinition> list = repositoryService.createProcessDefinitionQuery().listPage( bean.getPageSize()*(bean.getPageNum()-1),bean.getPageSize());
        List<ProcessDef> result = new ArrayList<>();
        for(int i=0;i<list.size();i++){
            ProcessDef processDef = new ProcessDef();
            ProcessDefinitionEntity process = (ProcessDefinitionEntity)list.get(i);

            processDef.setId(process.getId());
            processDef.setDeploymentId(process.getDeploymentId());
            processDef.setDescription(process.getDescription());
            processDef.setVersion(process.getVersion());
            processDef.setKey(process.getKey());
            processDef.setCategory(process.getCategory());
            processDef.setDiagramResourceName(process.getDiagramResourceName());

            processDef.setResourceName(process.getResourceName());

            Deployment deployment = repositoryService.createDeploymentQuery().deploymentId(process.getDeploymentId()).singleResult();
            processDef.setCreateDate(deployment.getDeploymentTime());
            processDef.setName(deployment.getName());

            result.add(processDef);
        }

        bean.setList(result);
        return bean;
    }
}
