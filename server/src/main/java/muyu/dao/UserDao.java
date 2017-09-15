package muyu.dao;

import muyu.model.User;
import org.springframework.stereotype.Component;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/15
 * @version: 1.0.0
 */
@Component
public interface  UserDao {
    User getUser();

}
