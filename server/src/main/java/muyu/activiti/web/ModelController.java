package muyu.activiti.web;

import muyu.activiti.service.ModelService;
import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.ResultPageBean;
import muyu.system.web.BaseController;
import org.activiti.engine.impl.persistence.entity.ModelEntity;
import org.activiti.engine.repository.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

@RestController
@RequestMapping("${prefixPath}/model/")
public class ModelController extends BaseController {

    @Autowired
    ModelService modelService;

    @RequestMapping("save")
    public ResultBean<Model> save(@RequestBody ModelEntity model) throws UnsupportedEncodingException {
        return modelService.save(model);
    }

    @GetMapping("deploy")
    public ResultBean deploy(String id) throws Exception {
        return modelService.deploy(id);
    }

    @RequestMapping("get")
    public ResultBean<Model> get(Model model){
        return  modelService.get(model);
    }

    @RequestMapping("findPage")
    public ResultPageBean<Model> findPage(HttpServletRequest request) {
        return modelService.findPage(request);
    }

    @RequestMapping("delete")
    public ResultBean<Model> delete(Model model){
       return  modelService.delete(model);
    }
}
