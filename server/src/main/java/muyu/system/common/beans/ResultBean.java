package muyu.system.common.beans;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/19
 * @version: 1.0.0
 */

@EqualsAndHashCode(callSuper = true)
@Data
public class ResultBean<T> extends  BaseResultBean implements Serializable {

    private T data;

    public ResultBean() {
        super();
    }

    public ResultBean(String msg,boolean state){
        super(msg,state);
    }

    public ResultBean(T data) {
        super();
        this.data = data;
    }

    public ResultBean(Throwable t) {
        super(t);
    }
}