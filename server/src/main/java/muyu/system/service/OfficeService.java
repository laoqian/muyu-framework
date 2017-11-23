package muyu.system.service;

import muyu.system.common.persistence.TreeEntity;
import muyu.system.common.service.TreeService;
import muyu.system.dao.OfficeDao;
import muyu.system.entity.Office;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017-11-23 14:54:40
 * @version: 1.0.0
 */

@Service
@Transactional
public class OfficeService extends TreeService<OfficeDao,Office> {

}
