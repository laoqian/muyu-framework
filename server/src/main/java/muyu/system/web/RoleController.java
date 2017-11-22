package muyu.system.web;

import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.ResultPageBean;
import muyu.system.entity.Role;
import muyu.system.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017-11-22 09:23:54
 * @version: 1.0.0
 */

@RestController
@RequestMapping("${prefixPath}/role/")
public class RoleController extends BaseController{

    @Autowired
    RoleService roleService;

    @ModelAttribute
    public Role preState(@RequestParam(required=false) String id){
        Role role = roleService.get(id);
        return role!=null ? role : new Role();
    }
    @RequestMapping("get")
    public ResultBean<Role> get(Role role){
        return roleService.query(role);
    }

    @RequestMapping("findPage")
    public ResultPageBean<Role> findPage(Role role, HttpServletRequest request){
        return roleService.findPage(request,role);
    }

    @RequestMapping("save")
    public ResultBean<Role> save(Role role){
        return roleService.save(role);
    }

    @RequestMapping("delete")
    public ResultBean<Role> delete(Role role){
        return roleService.delete(role);
    }
}
