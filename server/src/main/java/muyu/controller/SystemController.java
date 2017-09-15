package muyu.controller;

import muyu.model.User;
import muyu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/14
 * @version: 1.0.0
 */
@RestController
@RequestMapping("/")
public class SystemController{

    @Autowired
    UserService userService;

    @RequestMapping("login")
    public User login(){
        return userService.get();
    }
}
