package muyu.activiti.service;

import muyu.activiti.entity.Act;
import muyu.system.common.beans.ResultPageBean;
import muyu.system.common.service.BaseService;
import muyu.system.entity.Role;
import muyu.system.entity.User;
import muyu.system.utils.UserUtils;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.task.Task;
import org.activiti.engine.task.TaskQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
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

}
