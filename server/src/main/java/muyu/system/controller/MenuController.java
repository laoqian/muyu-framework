package muyu.system.controller;

import muyu.system.entity.Menu;
import muyu.system.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
public class MenuController  extends BaseController{

    @Autowired
    MenuService menuService;

    @RequestMapping("findList")
    List<Menu> findList(){
        return menuService.findList(null);
    }
}
