package muyu.system.service;

import muyu.system.common.service.CrudService;
import muyu.system.dao.DictDao;
import muyu.system.entity.Dict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/15
 * @version: 1.0.0
 */

@Service
@Transactional
public class DictService extends CrudService<DictDao,Dict>{

}
