package muyu.system.dao;

import muyu.system.common.persistence.CrudDao;
import muyu.system.entity.RoleMenu;
import muyu.system.entity.User;
import muyu.system.entity.UserRole;
import muyu.system.security.SecurityUser;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
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
public interface  UserDao extends CrudDao<User>{

    SecurityUser getUser(String loginName);

    @Select("select user_id as \"userId\",role_id as \"roleId\" , id as \"id\" from sys_user_role where user_id =#{0} ")
    List<UserRole> findUserRoleList(String userId);

    @Delete("DELETE FROM sys_user_role a where a.user_id =#{0}")
    void deleteUserRole(String userId);

    @Insert("insert into sys_user_role (id,user_id,role_id) values(#{id},#{userId},#{roleId})")
    void insertUserRole(UserRole userRole);
}
