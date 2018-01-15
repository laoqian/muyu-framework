package muyu.activiti.web;

import muyu.activiti.entity.Act;
import muyu.activiti.entity.ProcessDef;
import muyu.activiti.service.ActTaskService;
import muyu.activiti.service.ProcessService;
import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.ResultPageBean;
import muyu.system.web.BaseController;
import org.activiti.engine.repository.Model;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.xml.stream.XMLStreamException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;


/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2018年1月14日
 * @version: 1.0.0
 */

@RestController
@RequestMapping("${prefixPath}/task/")
public class TaskController extends BaseController {

    @Autowired
    ActTaskService actTaskService;

    @RequestMapping("findPage")
    public ResultPageBean<Task> findPage(Act act, HttpServletRequest request) {
        return actTaskService.findPage(act,request);
    }

    @RequestMapping("claim")
    public ResultBean<String> claim(Act act) {
        return actTaskService.claim(act.getTaskId(),act.getAssignee());
    }

}
