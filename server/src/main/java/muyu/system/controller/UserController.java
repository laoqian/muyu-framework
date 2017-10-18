package muyu.system.controller;

import muyu.system.common.beans.ResultBean;
import muyu.system.common.utils.UserUtils;
import muyu.system.entity.User;
import muyu.system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${prefixPath}/user/")
public class UserController extends BaseController{

    @Autowired
    UserService userService;

    @RequestMapping("getAuthedUser")
    ResultBean<User> getAuthedUser(User user){
        return new ResultBean<>(UserUtils.getUser());
    }

    @RequestMapping("get")
    ResultBean<User> get(User user){
        return userService.query(user);
    }

    @RequestMapping("save")
    ResultBean<User> save(User user){
        return userService.save(user);
    }
}
