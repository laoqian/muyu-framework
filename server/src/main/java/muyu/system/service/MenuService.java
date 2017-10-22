package muyu.system.service;

import muyu.system.common.beans.ResultBean;
import muyu.system.common.security.SecurityUser;
import muyu.system.common.service.CrudService;
import muyu.system.common.service.TreeService;
import muyu.system.dao.MenuDao;
import muyu.system.dao.UserDao;
import muyu.system.entity.Menu;
import org.springframework.beans.factory.annotation.Autowired;
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
public class MenuService extends TreeService<MenuDao,Menu> {

}
