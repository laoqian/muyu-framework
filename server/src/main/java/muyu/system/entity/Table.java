
package muyu.system.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import muyu.system.common.persistence.DataEntity;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/14
 * @version: 1.0.0
 */

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class Table extends DataEntity<Table> {
	String   name;
	String   comments;
	String   className;
	String   packageName;
	Integer  type;
}