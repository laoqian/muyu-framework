package muyu.system.security;

import org.springframework.security.core.AuthenticationException;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/11/13
 * @version: 1.0.0
 */
public class MaxAuthedNumLimitException extends AuthenticationException {
    public MaxAuthedNumLimitException(String msg, Throwable t) {
        super(msg, t);
    }

    public MaxAuthedNumLimitException(String msg) {
        super(msg);
    }
}
