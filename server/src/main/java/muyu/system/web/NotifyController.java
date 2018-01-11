package muyu.system.web;

import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.ResultPageBean;
import muyu.system.entity.Notify;
import muyu.system.service.NotifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2018/1/11
 * @version: 1.0.0
 */
@RestController
@RequestMapping("${prefixPath}/notify/")
public class NotifyController extends BaseController{

    @Autowired
    NotifyService notifyService;

    @RequestMapping("get")
    ResultBean<Notify> get(Notify notify){
        return notifyService.query(notify);
    }

    @RequestMapping("save")
    ResultBean<Notify> save(@RequestBody Notify notify){
        return notifyService.save(notify);
    }

    @RequestMapping("delete")
    ResultBean<Notify> delete(Notify notify){
        return notifyService.delete(notify);
    }

    @RequestMapping("findPage")
    public ResultPageBean<Notify> findPage(Notify notify, HttpServletRequest request){
        return notifyService.findPage(request,notify);
    }
}
