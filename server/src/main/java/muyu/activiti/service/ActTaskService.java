package muyu.activiti.service;

import com.google.common.collect.Maps;
import muyu.activiti.dao.ActDao;
import muyu.activiti.entity.Act;
import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.ResultPageBean;
import muyu.system.common.service.BaseService;
import muyu.system.entity.Role;
import muyu.system.entity.User;
import muyu.system.utils.UserUtils;
import org.activiti.engine.IdentityService;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.activiti.engine.task.TaskQuery;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2018年1月14日
 * @version: 1.0.0
 */

@Service
public class ActTaskService extends BaseService{

    @Autowired
    RepositoryService repositoryService;

    @Autowired
    RuntimeService runtimeService;

    @Autowired
    TaskService taskService;

    @Autowired
    IdentityService identityService;

    @Autowired
    ActDao actDao;

    public ResultBean<Task> getTask(String taskId){
        return new ResultBean<>(taskService.createTaskQuery().taskId(taskId).singleResult());
    }

    public ResultPageBean<Task> findPage(Act act, HttpServletRequest request) {
        User user  = UserUtils.getUser();
        if(user==null){
            return new ResultPageBean<>("未登陆的用户",false);
        }

        ResultPageBean<Task> bean = new ResultPageBean<>(request);

        TaskQuery  taskQuery = taskService.createTaskQuery().includeProcessVariables().active().orderByTaskCreateTime().desc();

        switch (act.getStatus()) {
            case "todo":
                taskQuery.taskAssignee(user.getId());
                break;
            case "toclaim":
                taskQuery.taskCandidateGroupIn(user.getRoleList().stream().map(Role::getEname).collect(Collectors.toList()));
                break;
            default:
                return new ResultPageBean<>("未知的任务状态", false);
        }

        if(act.getBeginDate()!=null){
            taskQuery.taskCreatedAfter(act.getBeginDate());
        }

        if(act.getEndDate()!=null){
            taskQuery.taskCreatedBefore(act.getEndDate());
        }

        bean.setList(taskQuery.listPage(bean.getPageSize()*(bean.getPageNum()-1),bean.getPageSize()));

        return bean;
    }

    public String startProcess(String procDefKey, String businessTable, String businessId) {
        return startProcess(procDefKey, businessTable, businessId, "");
    }

    public String startProcess(String procDefKey, String businessTable, String businessId, String title) {
        Map<String, Object> vars = Maps.newHashMap();
        return startProcess(procDefKey, businessTable, businessId, title, vars);
    }

    public String startProcess(String procDefKey, String businessTable, String businessId, String title, Map<String, Object> vars) {
        User user  = UserUtils.getUser();
        if(user ==null){
            return null;
        }

        identityService.setAuthenticatedUserId(UserUtils.getUser().getId());

        if (vars == null){
            vars = Maps.newHashMap();
        }

        if (StringUtils.isNotBlank(title)){
            vars.put("title", title);
        }

        ProcessInstance procIns = runtimeService.startProcessInstanceByKey(procDefKey, businessTable+":"+businessId, vars);

        Act act = new Act();
        act.setBusinessTable(businessTable);// 业务表名
        act.setBusinessId(businessId);	// 业务表ID
        act.setProcInsId(procIns.getId());
        actDao.updateProcInsIdByBusinessId(act);
        return act.getProcInsId();
    }

    public ResultBean<String> claim(String taskId, String userId){
        taskService.claim(taskId, userId);
        return new ResultBean<>("签收任务成功",true);
    }

    public ResultBean<String> delegate(String taskId, String userId){
        taskService.unclaim(taskId);
        taskService.claim(taskId,userId);
        return new ResultBean<>("委派任务成功",true);
    }

    public void complete(String taskId, String procInsId, String comment, Map<String, Object> vars){
        complete(taskId, procInsId, comment, "", vars);
    }

    public void complete(String taskId, String procInsId, String comment, String title, Map<String, Object> vars){
        if (StringUtils.isNotBlank(procInsId) && StringUtils.isNotBlank(comment)){
            taskService.addComment(taskId, procInsId, comment);
        }

        if (vars == null){
            vars = Maps.newHashMap();
        }

        if (StringUtils.isNotBlank(title)){
            vars.put("title", title);
        }

        taskService.complete(taskId, vars);
    }
}
