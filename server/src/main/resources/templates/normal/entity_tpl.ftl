
package ${packageName}.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import muyu.system.common.persistence.DataEntity;
<#list packages as package>
import ${package};
</#list>

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 * ${entityName}
 * @author  于其先
 * @version
 */

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class ${entityName} extends ${pClass}<${entityName}> {
	private static final long serialVersionUID = 1L;
	<#list columnList as column>
    ${column["javaType"]} ${column["javaFiled"]};  //${column["comments"]}
	</#list>
}