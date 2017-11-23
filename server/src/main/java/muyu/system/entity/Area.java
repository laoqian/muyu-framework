
package muyu.system.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import muyu.system.common.persistence.DataEntity;
import muyu.system.common.persistence.TreeEntity;

import java.util.Date;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 * Area
 * @author  于其先
 * @version 2017-11-23 15:55:41
 */

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class Area extends TreeEntity<Area> {
	private static final long serialVersionUID = 1L;
    String name;  //name
    String code;  //code
    Character type;  //type
}