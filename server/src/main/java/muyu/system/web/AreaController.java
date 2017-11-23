package muyu.system.web;

import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.ResultPageBean;
import muyu.system.entity.Area;
import muyu.system.entity.Office;
import muyu.system.service.AreaService;
import muyu.system.web.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017-11-23 15:55:41
 * @version: 1.0.0
 */

@RestController
@RequestMapping("${prefixPath}/area/")
public class AreaController extends BaseController{

    @Autowired
    AreaService areaService;

    @ModelAttribute
    public Area preState(@RequestParam(required=false) String id){
        Area area = areaService.get(id);
        return area!=null ? area : new Area();
    }
    @RequestMapping("get")
    public ResultBean<Area> get(Area area){
        return areaService.query(area);
    }

    @RequestMapping("findPage")
    public ResultPageBean<Area> findPage(Area area, HttpServletRequest request){
        return areaService.findPage(request,area);
    }

    @RequestMapping("findTree")
    public ResultPageBean<Area> findTree(HttpServletRequest request){
        return areaService.findTreePage(request,"0");
    }
    @RequestMapping("save")
    public ResultBean<Area> save(Area area){
        return areaService.save(area);
    }

    @RequestMapping("delete")
    public ResultBean<Area> delete(Area area){
        return areaService.delete(area);
    }

    @RequestMapping("transform")
    @ResponseBody
    public ResultBean<Area> transform(String ids,String type){
        return areaService.transform(ids,type);
    }
}
