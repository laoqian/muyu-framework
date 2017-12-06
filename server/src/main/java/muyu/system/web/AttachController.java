package muyu.system.web;

import freemarker.template.Template;
import freemarker.template.TemplateException;
import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.ResultPageBean;
import muyu.system.entity.Attach;
import muyu.system.service.AttachService;
import muyu.system.utils.ExtendUtils;
import muyu.system.web.BaseController;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.util.Date;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017-12-06 09:08:40
 * @version: 1.0.0
 */

@RestController
@RequestMapping("${prefixPath}/attach/")
public class AttachController extends BaseController{

    @Autowired
    AttachService attachService;

    @ModelAttribute
    public Attach preState(@RequestParam(required=false) String id){
        Attach attach = attachService.get(id);
        return attach!=null ? attach : new Attach();
    }

    @RequestMapping("get")
    public ResultBean<Attach> get(Attach attach){
        return attachService.query(attach);
    }

    @RequestMapping("findPage")
    public ResultPageBean<Attach> findPage(Attach attach, HttpServletRequest request){
        return attachService.findPage(request,attach);
    }

    @RequestMapping("save")
    public ResultBean<Attach> save(Attach attach){
        return attachService.save(attach);
    }

    @RequestMapping("delete")
    public ResultBean<Attach> delete(Attach attach){
        return attachService.delete(attach);
    }

    @RequestMapping("upload")
    public ResultBean<Attach> upload(@RequestBody MultipartFile file){
        return attachService.upload(file);
    }
}
