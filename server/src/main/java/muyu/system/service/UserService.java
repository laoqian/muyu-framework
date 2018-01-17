package muyu.system.service;

import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.SubmitBatchBean;
import muyu.system.dao.MenuDao;
import muyu.system.entity.*;
import muyu.system.security.SecurityUser;
import muyu.system.common.service.CrudService;
import muyu.system.dao.UserDao;
import muyu.system.utils.EncoderUtils;
import muyu.system.utils.IdUtils;
import muyu.system.utils.UserUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.DigestUtils;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    @Autowired
    MenuDao menuDao;

    public ResultBean<List> findUserRoleList(String  userId) {
        ResultBean<List> bean = new ResultBean<>();
        bean.setData(dao.findUserRoleList(userId));
        return bean;
    }

    public ResultBean<List> findUserMenuList(String  userId) {
        ResultBean<List> bean = new ResultBean<>();
        User user = dao.get(userId);
        if(user==null){
            bean.setCode(ResultBean.USER_NOT_FOUND);
            return bean;
        }

        if("yu".equals(user.getLoginName())){
            bean.setData( menuDao.findTree("0"));
        }else{
            List<UserRole> userRoleList = dao.findUserRoleList(userId);
            if(userRoleList!=null){
                Set roleIds = new HashSet<>();
                userRoleList.forEach(userRole ->roleIds.add(userRole.getRoleId()));
                bean.setData(menuDao.findRoleTree("0",StringUtils.join(roleIds,",")));
            }
        }

        return bean;
    }

    public ResultBean<User> saveRoleMenuBatch(SubmitBatchBean<User,String> batchBean) {
        User user = batchBean.getData();
        dao.deleteUserRole(user.getId());

        batchBean.getList().forEach(roleId->dao.insertUserRole(new UserRole(IdUtils.genId(),user.getId(),roleId)));
        return new ResultBean(batchBean.getData());
    }

    public ResultBean<String> changePassword(User user,String newPassword) {
        if(StringUtils.isBlank(user.getId())||StringUtils.isBlank(user.getPassword())){
            return new ResultBean<>("输入原始密码为空！",false);
        }

        if(StringUtils.isBlank(newPassword)){
            return new ResultBean<>("输入新密码不能为空！",false);
        }

        User dbUser = dao.get(user);
        String password = DigestUtils.md5DigestAsHex(user.getPassword().getBytes());
        if(!password.equals(dbUser.getPassword())){
            return new ResultBean<>("原密码校验失败！",false);
        }

        dbUser.setPassword(DigestUtils.md5DigestAsHex(newPassword.getBytes()));
        super.save(dbUser);
        return new ResultBean<>("修改密码成功！",true);
    }

    public void loginCountIncrease(User user){
        dao.loginCountIncrease(user);
    }
}
