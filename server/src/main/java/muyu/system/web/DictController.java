package muyu.system.web;

import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.ResultPageBean;
import muyu.system.entity.Dict;
import muyu.system.service.DictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/26
 * @version: 1.0.0
 */

@RestController
@RequestMapping("${prefixPath}/dict/")
public class DictController extends BaseController{

    @Autowired
    DictService dictService;

    @ModelAttribute
    public Dict preState(@RequestParam(required=false) String id){
        Dict dict = dictService.get(id);
        return dict!=null ? dict : new Dict();
    }

    @RequestMapping("get")
    public ResultBean<Dict> get(Dict dict){
        return dictService.query(dict);
    }

    @RequestMapping("findPage")
    public ResultPageBean<Dict> findPage(Dict dict, HttpServletRequest request){
        return dictService.findPage(request,dict);
    }

    @RequestMapping("save")
    public ResultBean<Dict> save(@RequestBody Dict dict){
        return dictService.save(dict);
    }

    @RequestMapping("delete")
    public ResultBean<Dict> delete(Dict dict){
        return dictService.delete(dict);
    }
}
