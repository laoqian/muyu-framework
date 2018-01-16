package muyu.activiti.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import muyu.system.common.persistence.DataEntity;
import muyu.system.utils.ContextUtils;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.ProcessDefinition;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.Serializable;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/12/19
 * @version: 1.0.0
 */

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class ProcessDef extends DataEntity<ProcessDef> implements ProcessDefinition,Serializable{
    private static final long serialVersionUID = 1L;
    String category;
    String name;
    String key;
    String description;
    int version;
    String resourceName;
    String deploymentId;
    String diagramResourceName;
    String tenantId;


    public ProcessDef(ProcessDefinition processDefinition){
        this.setId(processDefinition.getId());
        this.setDeploymentId(processDefinition.getDeploymentId());
        this.setDescription(processDefinition.getDescription());
        this.setVersion(processDefinition.getVersion());
        this.setKey(processDefinition.getKey());

        this.setDiagramResourceName(processDefinition.getDiagramResourceName());

        this.setResourceName(processDefinition.getResourceName());

        RepositoryService repositoryService = ContextUtils.getBean(RepositoryService.class);
        Deployment deployment = repositoryService.createDeploymentQuery().deploymentId(processDefinition.getDeploymentId()).singleResult();
        this.setCreateDate(deployment.getDeploymentTime());
        this.setCategory(deployment.getCategory());
        this.setName(deployment.getName());
    }

    @Override
    public boolean hasStartFormKey() {
        return false;
    }

    @Override
    public boolean hasGraphicalNotation() {
        return false;
    }

    @Override
    public boolean isSuspended() {
        return false;
    }
}
