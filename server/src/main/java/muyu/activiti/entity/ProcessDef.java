package muyu.activiti.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import muyu.system.common.persistence.DataEntity;
import org.activiti.engine.repository.ProcessDefinition;

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
