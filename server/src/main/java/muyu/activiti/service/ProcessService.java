package muyu.activiti.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import muyu.activiti.entity.ProcessDef;
import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.ResultPageBean;
import muyu.system.common.service.BaseService;
import org.activiti.bpmn.converter.BpmnXMLConverter;
import org.activiti.bpmn.model.BpmnModel;
import org.activiti.editor.constants.ModelDataJsonConstants;
import org.activiti.editor.language.json.converter.BpmnJsonConverter;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.repository.Model;
import org.activiti.engine.repository.ProcessDefinition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sun.misc.BASE64Encoder;

import javax.servlet.http.HttpServletRequest;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamReader;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/12/19
 * @version: 1.0.0
 */

@Service
public class ProcessService extends BaseService{

    @Autowired
    RepositoryService repositoryService;

    @Autowired
    RuntimeService runtimeService;

    public ResultBean<ProcessDef> get(ProcessDefinition processDefinition) {
        ProcessDefinition process = repositoryService.createProcessDefinitionQuery().processDefinitionId(processDefinition.getId()).singleResult();
        return  new ResultBean<>(new ProcessDef(process));
    }

    public ResultBean<String> getImage(ProcessDefinition processDefinition) throws IOException {
        ProcessDefinition process    = repositoryService.createProcessDefinitionQuery().processDefinitionId(processDefinition.getId()).singleResult();
        InputStream resourceAsStream = repositoryService.getResourceAsStream(process.getDeploymentId(),process.getDiagramResourceName());
        BASE64Encoder encoder = new BASE64Encoder();
        ByteArrayOutputStream swapStream = new ByteArrayOutputStream();

        byte[] buff = new byte[100];
        int rc;
        while ((rc = resourceAsStream.read(buff, 0, 100)) > 0) {
            swapStream.write(buff, 0, rc);
        }
        byte[] imageBytes = swapStream.toByteArray();

        return  new ResultBean<>(encoder.encode(imageBytes));
    }

    public ResultBean<ProcessDefinition> delete(ProcessDefinition processDefinition){
        ProcessDefinition process = repositoryService.createProcessDefinitionQuery().processDefinitionId(processDefinition.getId()).singleResult();
        repositoryService.deleteDeployment(process.getDeploymentId(),true); /*级联删除流程实例*/
        return new ResultBean<>("删除流程成功",true);
    }

    public ResultPageBean<ProcessDef> findPage(HttpServletRequest request){
        ResultPageBean<ProcessDef> bean = new ResultPageBean<>(request);
        List<ProcessDefinition> list = repositoryService.createProcessDefinitionQuery().latestVersion().listPage( bean.getPageSize()*(bean.getPageNum()-1),bean.getPageSize());
        List<ProcessDef> result = new ArrayList<>();
        for (ProcessDefinition aList : list) {
            ProcessDef processDef = new ProcessDef(aList);
            result.add(processDef);
        }

        bean.setList(result);
        return bean;
    }

    public ResultBean<Model> toModel(String  procDefId) throws UnsupportedEncodingException, XMLStreamException {

        ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery().processDefinitionId(procDefId).singleResult();
        InputStream bpmnStream = repositoryService.getResourceAsStream(processDefinition.getDeploymentId(),
                processDefinition.getResourceName());
        XMLInputFactory xif = XMLInputFactory.newInstance();
        InputStreamReader in = new InputStreamReader(bpmnStream, "UTF-8");
        XMLStreamReader xtr = xif.createXMLStreamReader(in);
        BpmnModel bpmnModel = new BpmnXMLConverter().convertToBpmnModel(xtr);

        BpmnJsonConverter converter = new BpmnJsonConverter();
        ObjectNode modelNode = converter.convertToJson(bpmnModel);
        org.activiti.engine.repository.Model modelData = repositoryService.newModel();
        modelData.setKey(processDefinition.getKey());
        modelData.setName(processDefinition.getResourceName());
        modelData.setCategory(processDefinition.getCategory());//.getDeploymentId());
        modelData.setDeploymentId(processDefinition.getDeploymentId());
        modelData.setVersion(Integer.parseInt(String.valueOf(repositoryService.createModelQuery().modelKey(modelData.getKey()).count()+1)));

        ObjectNode modelObjectNode = new ObjectMapper().createObjectNode();
        modelObjectNode.put(ModelDataJsonConstants.MODEL_NAME, processDefinition.getName());
        modelObjectNode.put(ModelDataJsonConstants.MODEL_REVISION, modelData.getVersion());
        modelObjectNode.put(ModelDataJsonConstants.MODEL_DESCRIPTION, processDefinition.getDescription());
        modelData.setMetaInfo(modelObjectNode.toString());

        repositoryService.saveModel(modelData);

        repositoryService.addModelEditorSource(modelData.getId(), modelNode.toString().getBytes("utf-8"));

        return new ResultBean<>(modelData);
    }

    @Transactional(readOnly = false)
    public ResultBean<String> deleteProcIns(String procInsId, String deleteReason) {
        runtimeService.deleteProcessInstance(procInsId, deleteReason);
        return new ResultBean<>("删除成功");
    }
}
