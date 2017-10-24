package muyu.system.controller;

import com.github.pagehelper.Page;
import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.ResultPageBean;
import muyu.system.entity.Dict;
import muyu.system.entity.Menu;
import muyu.system.service.MenuService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/26
 * @version: 1.0.0
 */

@RestController
@RequestMapping("${prefixPath}/menu/")
public class MenuController extends BaseController{

    @Autowired
    MenuService menuService;

    @ModelAttribute
    public Menu preState(@RequestParam(required=false) String id){
        Menu menu =null;
        if(StringUtils.isNotBlank(id)){
            menu = menuService.get(id);
        }

        return menu==null?new Menu():menu;
    }

    @RequestMapping("findList")
    public ResultBean<List> findList(Menu menu) {
        List<Menu> list = menuService.findList(menu);
        return new ResultBean<>(list);
    }

    @RequestMapping("get")
    public ResultBean<Menu> get(Menu menu){
        return menuService.query(menu);
    }

    @RequestMapping("findTree")
    public ResultPageBean<Menu> findTree(HttpServletRequest request, HttpServletResponse response) throws InterruptedException {
        return menuService.findTreePage(request,"0");
    }

    @RequestMapping("save")
    public ResultBean<Menu> save(Menu menu){
        return menuService.save(menu);
    }

    @RequestMapping("delete")
    public ResultBean<Menu> delete(Menu menu){
        return menuService.delete(menu);
    }

    @RequestMapping("chgLevel")
    @ResponseBody
    public ResultBean<Menu> chgLevel(Menu menu,Integer type){
        return menuService.chgLevel(menu,type);
    }
}
