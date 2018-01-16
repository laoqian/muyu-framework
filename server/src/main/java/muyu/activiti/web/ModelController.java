package muyu.activiti.web;

import muyu.activiti.service.ModelService;
import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.ResultPageBean;
import muyu.system.web.BaseController;
import org.activiti.engine.repository.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;


/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017年12月19日
 * @version: 1.0.0
 */

@RolesAllowed("ROLE_SUPER_ADMIN")
@RestController
@RequestMapping("${prefixPath}/model/")
public class ModelController extends BaseController {

    @Autowired
    ModelService modelService;

    @GetMapping("create")
    public ResultBean<Model> create(String name, String key, String description, String category) throws UnsupportedEncodingException {
        return modelService.create(name, key, description, category);
    }

    @GetMapping("deploy")
    public ResultBean deploy(String id) throws Exception {
        return modelService.deploy(id);
    }

    @GetMapping("get")
    public ResultBean<Model> get(Model model){
        return  modelService.get(model);
    }

    @GetMapping("findPage")
    public ResultPageBean<Model> findPage(HttpServletRequest request) {
        return modelService.findPage(request);
    }

    @GetMapping("delete")
    public ResultBean<Model> delete(Model model){
       return  modelService.delete(model);
    }
}
