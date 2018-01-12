package muyu.system.web;

import muyu.system.common.beans.ResultBean;
import muyu.system.security.SecurityUser;
import muyu.system.entity.Config;
import muyu.system.service.SystemService;
import muyu.system.service.UserService;
import muyu.system.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;

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

    @RequestMapping("getConfig")
    public ResultBean<Config> getConfig(){
       return systemService.getConfig();
    }

    @RequestMapping("getCachedCode")
    public ResultBean<String> getCachedCode(HttpServletRequest request) throws IOException {
        return systemService.getCachedCode(request);
    }

    @RequestMapping(value = "onlineCount",method = RequestMethod.GET)
    public ResultBean onlineCount(){
        return new ResultBean<>(UserUtils.getOnlineCount());
    }

    @RequestMapping(value = "loginCount",method = RequestMethod.GET)
    public ResultBean loginCount(){
        return new ResultBean<>(UserUtils.getUser().getLoginCount());
    }


}
