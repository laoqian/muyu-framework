package muyu.system.service;

import muyu.system.common.service.CrudService;
import muyu.system.common.service.TreeService;
import muyu.system.dao.AreaDao;
import muyu.system.entity.Area;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017-11-23 15:55:41
 * @version: 1.0.0
 */

@Service
@Transactional
public class AreaService extends TreeService<AreaDao,Area> {

}
