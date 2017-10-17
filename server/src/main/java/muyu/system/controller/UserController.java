package muyu.system.controller;

import muyu.system.common.beans.ResultBean;
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

    @RequestMapping("get")
    ResultBean<User> get(User user) throws InterruptedException {
        Thread.sleep(2000);
        return userService.query(user);
    }

    @RequestMapping("save")
    ResultBean<User> save(User user) throws InterruptedException {
        return userService.save(user);
    }
}
