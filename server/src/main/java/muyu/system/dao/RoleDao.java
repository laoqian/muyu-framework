package muyu.system.dao;

import muyu.system.common.persistence.CrudDao;
import muyu.system.entity.Role;
import muyu.system.entity.RoleMenu;
import org.apache.ibatis.annotations.Delete;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/15
 * @version: 1.0.0
 */
@Component
public interface RoleDao extends CrudDao<Role>{
    List<RoleMenu> findRoleMenuList(RoleMenu roleMenu);

    @Delete("DELETE FROM sys_role_menu a where a.role_id =#{0}")
    void deleteRoleMenu(String roleId);

    void insertRoleMenu(RoleMenu roleMenu);

}
