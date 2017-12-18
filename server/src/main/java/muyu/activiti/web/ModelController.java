package muyu.activiti.web;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.ResultPageBean;
import muyu.system.web.BaseController;
import org.activiti.bpmn.converter.BpmnXMLConverter;
import org.activiti.bpmn.model.BpmnModel;
import org.activiti.editor.language.json.converter.BpmnJsonConverter;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.impl.persistence.entity.ModelEntity;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.List;

/**
 * Created by liuruijie on 2017/4/20.
 * 模型管理
 */
@RestController
@RequestMapping("${prefixPath}/model/")
public class ModelController extends BaseController {

    @Autowired
    RepositoryService repositoryService;

    @Autowired
    ObjectMapper objectMapper;

    /**
     * 新建一个空模型
     * @return
     * @throws UnsupportedEncodingException
     */
    @RequestMapping("save")
    public ResultBean<Model> save(@RequestBody ModelEntity model) throws UnsupportedEncodingException {

        model.setVersion(1);
        repositoryService.saveModel(model);

        //完善ModelEditorSource
        ObjectNode editorNode = objectMapper.createObjectNode();
        editorNode.put("id", "canvas");
        editorNode.put("resourceId", "canvas");
        ObjectNode stencilSetNode = objectMapper.createObjectNode();
        stencilSetNode.put("namespace","http://b3mn.org/stencilset/bpmn2.0#");
        editorNode.set("stencilset", stencilSetNode);
        repositoryService.addModelEditorSource(model.getId(),editorNode.toString().getBytes("utf-8"));

        return new ResultBean<>(model);
    }


    /**
     * 发布模型为流程定义
     * @param id
     * @return
     * @throws Exception
     */
    @GetMapping("deploy")
    public ResultBean deploy(String id) throws Exception {

        //获取模型
        Model modelData = repositoryService.getModel(id);
        byte[] bytes = repositoryService.getModelEditorSource(modelData.getId());

        if (bytes == null) {
            return new ResultBean("模型数据为空，请先设计流程并成功保存，再进行发布。",false);
        }

        JsonNode modelNode = new ObjectMapper().readTree(bytes);

        BpmnModel model = new BpmnJsonConverter().convertToBpmnModel(modelNode);
        if(model.getProcesses().size()==0){
            return new ResultBean("数据模型不符要求，请至少设计一条主线流程。",false);
        }
        byte[] bpmnBytes = new BpmnXMLConverter().convertToXML(model);

        //发布流程
        String processName = modelData.getName() + ".bpmn20.xml";
        Deployment deployment = repositoryService.createDeployment()
                .name(modelData.getName())
                .addString(processName, new String(bpmnBytes, "UTF-8"))
                .deploy();
        modelData.setDeploymentId(deployment.getId());
        repositoryService.saveModel(modelData);

        return new ResultBean("发布成功",true);
    }

    @RequestMapping("get")
    public ResultBean<Model> get(Model model) {
        return  new ResultBean<>((repositoryService.createModelQuery().modelId(model.getId()).singleResult()));
    }

    @RequestMapping("findPage")
    public ResultPageBean<Model> findPage(HttpServletRequest request) {
        ResultPageBean<Model> bean = new ResultPageBean<>(request);
        List<Model> list = repositoryService.createModelQuery().listPage( bean.getPageSize()*(bean.getPageNum()-1),bean.getPageSize());

        bean.setList(list);
        return bean;
    }

    @RequestMapping("delete")
    public ResultBean<Model> delete(Model model){
        repositoryService.deleteModel(model.getId());
        return new ResultBean<>("删除模型成功",true);
    }
}
