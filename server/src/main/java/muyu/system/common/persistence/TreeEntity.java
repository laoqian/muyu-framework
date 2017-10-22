package muyu.system.common.persistence;

import lombok.Data;
import lombok.EqualsAndHashCode;


/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017年9月21日
 * @version: 1.0.0
 */
@EqualsAndHashCode(callSuper = true)
@Data
public abstract class TreeEntity<T> extends DataEntity<T> {
    int level;
    boolean expanded = false; //默认不展开
    boolean leaf;
    private String parentId;

    public TreeEntity(){
        super();
    }

    public TreeEntity(String id){
        super(id);
    }
}
