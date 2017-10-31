package muyu.system.common.beans;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/19
 * @version: 1.0.0
 */

@Data
public class SubmitBatchBean<D,L> implements Serializable {

    private static final long serialVersionUID = 1L;

    private D data;
    private List<L> list;

    public SubmitBatchBean() {
        super();
    }
}