
package muyu.system.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import muyu.system.common.persistence.DataEntity;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 * Role
 * @author  于其先
 * @date: 2018/1/11
 * @version 1.0.0
 */

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class Notify extends DataEntity<Notify>  {
	private static final long serialVersionUID = 1L;
    String title;
    String type;
    String content;
    String userId;
    String status;
}