package muyu.system.controller;

import com.github.pagehelper.Page;
import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.ResultPageBean;
import muyu.system.entity.Menu;
import muyu.system.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @RequestMapping("findList")
    public ResultBean<List> findList() throws InterruptedException {

        List<Menu> list = menuService.findList(null);
        Thread.sleep(1000);
        return new ResultBean<>(list);
    }

    @RequestMapping("findPage")
    public ResultPageBean<Menu> findPage(Menu menu, HttpServletRequest request, HttpServletResponse response) throws InterruptedException {

        return menuService.findPage(request,menu);
    }
}
