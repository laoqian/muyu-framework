package muyu.system.controller;

import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.ResultPageBean;
import muyu.system.common.utils.UserUtils;
import muyu.system.entity.Menu;
import muyu.system.entity.User;
import muyu.system.entity.User;
import muyu.system.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("${prefixPath}/user/")
public class UserController extends BaseController{

    @Autowired
    UserService userService;

    @ModelAttribute
    public User preState(@RequestParam(required=false) String id){
        return StringUtils.isNotBlank(id)?userService.get(id):null;
    }

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

    @RequestMapping("findPage")
    public ResultPageBean<User> findPage(User user, HttpServletRequest request){
        return userService.findPage(request,user);
    }

}
