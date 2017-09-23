package muyu.controller;

import muyu.common.beans.ResultBean;
import muyu.common.security.SecurityUser;
import muyu.model.User;
import muyu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/14
 * @version: 1.0.0
 */
@RestController
@RequestMapping("/api/")
public class SystemController{

    @Autowired
    UserService userService;

    public ResultBean<SecurityUser> login(HttpSession httpSession){

        httpSession.setAttribute("11","2222222222");
        return userService.get("111");
    }


    @RequestMapping("get")
    public ResultBean<String> get(HttpSession httpSession){

       String value =(String)  httpSession.getAttribute("11");

       return new ResultBean<String>(value);
    }

}
