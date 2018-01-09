package muyu;

import muyu.system.utils.ContextUtils;
import muyu.system.websocket.ServerInitListener;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableAsync;


/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/14
 * @version: 1.0.0
 */


@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication application = new SpringApplication(Application.class);
        application.addListeners(new ServerInitListener());
        ContextUtils.ctx = application.run(args);
    }
}