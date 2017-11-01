
package muyu.system.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
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
public class TableColumn extends DataEntity<TableColumn> {
	String genTableId;
	String name;
	String comments;
	String jdbcType;
	String javaType;
	String javaFiled;
	boolean isNull;
	boolean isQuery;
	String queryType;
	String showType;
	String dictType;
	int 	sort;

	public TableColumn() {
		super();
	}
}