package muyu.system.websocket;

import muyu.system.utils.UserUtils;
import org.springframework.security.web.session.HttpSessionEventPublisher;

import javax.servlet.http.HttpSessionEvent;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2018/1/11
 * @version: 1.0.0
 */
public class OnlineEventPublisher extends HttpSessionEventPublisher {

    @Override
    public void sessionCreated(HttpSessionEvent event) {
        super.sessionCreated(event);
        UserUtils.onlineCount++;
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent event) {
        UserUtils.onlineCount++;
        super.sessionDestroyed(event);
    }
}
