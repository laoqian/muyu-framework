package muyu.system.controller;

import muyu.system.common.beans.ResultPageBean;
import muyu.system.entity.Menu;
import muyu.system.entity.Office;
import muyu.system.service.OfficeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/26
 * @version: 1.0.0
 */

@RestController
@RequestMapping("${prefixPath}/office/")
public class OfficeController extends BaseController{

    @Autowired
    OfficeService officeService;



    @RequestMapping("findPage")
    public ResultPageBean<Office> findPage(Office office, HttpServletRequest request, HttpServletResponse response){

        return officeService.findPage(request,office);
    }
}
