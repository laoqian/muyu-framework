package muyu.system.service;

import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.SubmitBatchBean;
import muyu.system.entity.RoleMenu;
import muyu.system.entity.UserRole;
import muyu.system.security.SecurityUser;
import muyu.system.common.service.CrudService;
import muyu.system.dao.UserDao;
import muyu.system.entity.User;
import muyu.system.utils.IdUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/15
 * @version: 1.0.0
 */

@Service
@Transactional
public class UserService extends CrudService<UserDao,User>{


    public ResultBean<SecurityUser> getUser(String userName){

        SecurityUser user = new SecurityUser("11");
        user.setPassword("123");

        ResultBean<SecurityUser> bean = new ResultBean<>(user);
        return bean;
    }
    public ResultBean<List> findUserRoleList(String  userId) {
        ResultBean<List> bean = new ResultBean<>();
        bean.setData(dao.findUserRoleList(userId));
        return bean;
    }

    public ResultBean<User> saveRoleMenuBatch(SubmitBatchBean<User,String> batchBean) {
        User user = batchBean.getData();
        dao.deleteUserRole(user.getId());

        batchBean.getList().forEach(roleId->dao.insertUserRole(new UserRole(IdUtils.genId(),user.getId(),roleId)));
        return new ResultBean(batchBean.getData());
    }
}
