
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
 * @version 2017-11-22 09:23:54
 */

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class RoleMenu extends DataEntity<RoleMenu> {
	private static final long serialVersionUID = 1L;
    String roleId;   //name
    String menuId;   //ename

    public RoleMenu(String id,String roleId,String menuId){
        super(id);
        this.roleId = roleId;
        this.menuId = menuId;
    }
}