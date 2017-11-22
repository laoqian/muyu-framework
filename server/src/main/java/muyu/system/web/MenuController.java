package muyu.system.web;

import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.ResultPageBean;
import muyu.system.common.beans.SubmitBatchBean;
import muyu.system.common.tree.TreeNode;
import muyu.system.entity.Menu;
import muyu.system.service.MenuService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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
    public Menu preState(@RequestParam(required = false) String id) {
        Menu m=null;
        if (StringUtils.isNotBlank(id)){
            m = menuService.get(id);
        }

        return m != null ? m : new Menu();
    }

    @RequestMapping("findList")
    public ResultBean<List> findList(Menu menu) {
        List<Menu> list = menuService.findList(menu);
        return new ResultBean<>(list);
    }

    @RequestMapping("get")
    public ResultBean<Menu> get(Menu menu){
        return StringUtils.isNotBlank(menu.getId())?new ResultBean<>(menu):menuService.query(menu);
    }

    @RequestMapping("findTree")
    public ResultPageBean<Menu> findTree(HttpServletRequest request){
        return menuService.findTreePage(request,"0");
    }

    @RequestMapping("findTreeNode")
    public ResultBean<TreeNode> findTreeNode(HttpServletRequest request){
        return menuService.findTreeNode("0");
    }

    @RequestMapping("save")
    public ResultBean<Menu> save(Menu menu){
        return menuService.save(menu);
    }

    @RequestMapping("saveBatch")
    public ResultBean<Menu> saveBatch(@RequestBody SubmitBatchBean<?,Menu> batchBean){
        return menuService.saveBatch(batchBean);
    }

    @RequestMapping("delete")
    public ResultBean<Menu> delete(Menu menu){
        return menuService.delete(menu);
    }

    @RequestMapping("transform")
    @ResponseBody
    public ResultBean<Menu> transform(String ids,String type){
        return menuService.transform(ids,type);
    }
}
