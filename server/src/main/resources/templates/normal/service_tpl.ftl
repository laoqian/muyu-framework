package ${packageName+".service"};

import muyu.system.common.service.CrudService;
import ${packageName+".dao."+daoName};
import ${packageName+".entity."+entityName};
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: ${createDate?string("yyyy-MM-dd HH:mm:ss")}
 * @version: 1.0.0
 */

@Service
@Transactional
public class ${serviceName} extends CrudService<${daoName},${entityName}>{

}
