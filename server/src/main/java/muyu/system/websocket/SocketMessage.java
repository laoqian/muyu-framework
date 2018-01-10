package muyu.system.websocket;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2018/1/9
 * @version: 1.0.0
 */

@Data
@NoArgsConstructor
public class SocketMessage implements Serializable {

    public String info;
    public String date;

    public SocketMessage(String info){
        this.info = info;
    }
}
