package muyu.system.web;

import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.ResultPageBean;
import muyu.system.entity.Menu;
import muyu.system.entity.Office;
import muyu.system.service.OfficeService;
import muyu.system.web.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017-11-23 14:54:40
 * @version: 1.0.0
 */

@RestController
@RequestMapping("${prefixPath}/office/")
public class OfficeController extends BaseController{

    @Autowired
    OfficeService officeService;

    @ModelAttribute
    public Office preState(@RequestParam(required=false) String id){
        Office office = officeService.get(id);
        return office!=null ? office : new Office();
    }
    @RequestMapping("get")
    public ResultBean<Office> get(Office office){
        return officeService.query(office);
    }

    @RequestMapping("findTree")
    public ResultPageBean<Office> findTree(HttpServletRequest request){
        return officeService.findTreePage(request,"0");
    }

    @RequestMapping("findPage")
    public ResultPageBean<Office> findPage(Office office, HttpServletRequest request){
        return officeService.findPage(request,office);
    }

    @RequestMapping("save")
    public ResultBean<Office> save(@RequestBody Office office){
        return officeService.save(office);
    }

    @RequestMapping("delete")
    public ResultBean<Office> delete(Office office){
        return officeService.delete(office);
    }
}
