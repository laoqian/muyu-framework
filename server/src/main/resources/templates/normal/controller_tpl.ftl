package ${packageName+".web"};

import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.ResultPageBean;
import ${packageName+".entity."+entityName};
import ${packageName+".service."+serviceName};
import muyu.system.web.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: ${createDate?string("yyyy-MM-dd HH:mm:ss")}
 * @version: 1.0.0
 */

@RestController
@RequestMapping("${r'${prefixPath}'}/dict/")
public class ${controllerName} extends BaseController{

    @Autowired
    ${serviceName} ${serviceName?uncap_first};

    @ModelAttribute
    public ${entityName} preState(@RequestParam(required=false) String id){
        ${entityName} ${entityName?uncap_first} = ${serviceName?uncap_first}.get(id);
        return ${entityName?uncap_first}!=null ? ${entityName?uncap_first} : new ${entityName}();
    }
    @RequestMapping("get")
    public ResultBean<${entityName}> get(${entityName} ${entityName?uncap_first}){
        return ${serviceName?uncap_first}.query(${entityName?uncap_first});
    }

    @RequestMapping("findPage")
    public ResultPageBean<${entityName}> findPage(${entityName} ${entityName?uncap_first}, HttpServletRequest request){
        return ${serviceName?uncap_first}.findPage(request,${entityName?uncap_first});
    }

    @RequestMapping("save")
    public ResultBean<${entityName}> save(${entityName} ${entityName?uncap_first}){
        return ${serviceName?uncap_first}.save(${entityName?uncap_first});
    }

    @RequestMapping("delete")
    public ResultBean<${entityName}> delete(${entityName} ${entityName?uncap_first}){
        return ${serviceName?uncap_first}.delete(${entityName?uncap_first});
    }
}
