package muyu.system.dao;

import muyu.system.common.persistence.CrudDao;
import muyu.system.common.persistence.TreeDao;
import muyu.system.entity.Menu;
import muyu.system.entity.User;
import org.apache.ibatis.annotations.Param;
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
public interface MenuDao extends TreeDao<Menu> {

    List<Menu> findRoleTree(@Param("rootId") String rootId,@Param("roleIds") String roleIds);
}
