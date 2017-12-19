package muyu.activiti.web;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import muyu.activiti.entity.ProcessDef;
import muyu.activiti.service.ProcessService;
import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.ResultPageBean;
import muyu.system.web.BaseController;
import org.activiti.engine.repository.ProcessDefinition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;


/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017年12月19日09:34:42
 * @version: 1.0.0
 */

@RestController
@RequestMapping("${prefixPath}/process/")
public class ProcessController extends BaseController {

    @Autowired
    ProcessService processService;

    @RequestMapping("get")
    public ResultBean<ProcessDefinition> get(ProcessDefinition processDefinition) {
        return  processService.get(processDefinition);
    }

    @RequestMapping("findPage")
    public ResultPageBean<ProcessDef> findPage(HttpServletRequest request) {
        return processService.findPage(request);
    }

    @RequestMapping("delete")
    public ResultBean<ProcessDefinition> delete(ProcessDefinition processDefinition){
        return  processService.delete(processDefinition);
    }
}
