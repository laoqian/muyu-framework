package muyu.service;

import muyu.common.beans.ResultBean;
import muyu.common.security.SecurityUser;
import muyu.dao.UserDao;
import muyu.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
public class UserService {

    @Autowired
    UserDao dao;

    public ResultBean<SecurityUser> get(String userName){

//        User user =  dao.getUser();
        SecurityUser user = new SecurityUser("11");
        user.setPassword("123");

        ResultBean<SecurityUser> bean = new ResultBean<>(user);
        return bean;
    }
}
