package muyu.system.web;

import muyu.system.common.beans.ResultBean;
import muyu.system.common.security.SecurityUser;
import muyu.system.entity.Config;
import muyu.system.service.SystemService;
import muyu.system.service.UserService;
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
@RequestMapping("${prefixPath}/")
public class SystemController{

    @Autowired
    UserService userService;
    @Autowired
    SystemService systemService;

    public ResultBean<SecurityUser> login(HttpSession httpSession){

        httpSession.setAttribute("11","2222222222");
        return userService.getUser("111");
    }

    @RequestMapping("getConfig")
    public ResultBean<Config> getConfig(){
       return systemService.getConfig();
    }


}
