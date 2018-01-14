package muyu.activiti.web;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import muyu.activiti.entity.ProcessDef;
import muyu.activiti.service.ProcessService;
import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.ResultPageBean;
import muyu.system.web.BaseController;
import org.activiti.engine.repository.Model;
import org.activiti.engine.repository.ProcessDefinition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.stream.XMLStreamException;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;


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
    public ResultBean<ProcessDef> get(ProcessDefinition processDefinition) {
        return  processService.get(processDefinition);
    }

    @RequestMapping("getImage")
    public ResultBean<String> getImage(ProcessDefinition processDefinition) throws IOException {
        return processService.getImage(processDefinition);
    }

    @RequestMapping("findPage")
    public ResultPageBean<ProcessDef> findPage(HttpServletRequest request) {
        return processService.findPage(request);
    }

    @RequestMapping("toModel")
    public ResultBean<Model> toModel(String id) throws UnsupportedEncodingException, XMLStreamException {
        return processService.toModel(id);
    }

    @RequestMapping("delete")
    public ResultBean<ProcessDefinition> delete(ProcessDefinition processDefinition){
        return  processService.delete(processDefinition);
    }

    @RequestMapping("deleteProcIns")
    public ResultBean<String> deleteProcIns(String procInsId, String reason){
        return  processService.deleteProcIns(procInsId,reason);
    }

}
