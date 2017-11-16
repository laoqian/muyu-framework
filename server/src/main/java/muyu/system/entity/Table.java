
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
	String   name;        //表名
	String   comments;    //说明
	String   className;   //类名
	String   packageName; //包名
	Integer  type;        //类型 0：普通 1：树形
	Integer  editType;    //表单编辑类型：0：弹出式编辑 1：行内编辑
	Integer  genType;     //生成类型：0：:仅保存配置 1：生成服务端代码 2：生成客户端代码 3：全部生成
}