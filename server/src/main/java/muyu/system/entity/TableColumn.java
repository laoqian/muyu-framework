
package muyu.system.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import muyu.system.common.persistence.DataEntity;
import muyu.system.common.utils.ExtendUtils;
import org.apache.commons.lang3.StringUtils;

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


	String  tableName;
	String  genTableId;
	String  name;
	String  comments;
	String  jdbcType;
	Integer length;
	String  javaType;
	String  javaField;
	Integer isEmpty;
	Integer isQuery =1;
	String  queryType;
	String  showType;
	String  dictType;
	Integer sort;

	public String getComments() {
		return StringUtils.isBlank(comments)?name:comments;
	}

	public void setName(String name) {
		this.name = name;
		this.javaField = ExtendUtils.underline2Camel(name,true);
	}

	public String getJavaType(){

		if (StringUtils.isNotBlank(javaType)){
			return javaType;
		}

		switch (jdbcType){
			case "decimal":
			case "numeric":
				return "java.math.BigDecimal";
			case "char":
			case "varchar2":
			case "nvarchar2":
				return "String";
			case "timestamp(6)":
			case "DATE":
				return "Date";
			default:
				return "String";
		}
	}

	public TableColumn() {
		super();
	}
}