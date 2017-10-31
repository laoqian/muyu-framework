package muyu.system.common.persistence;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.beans.factory.annotation.Value;


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
    int level;                  //当前层级
    boolean expanded = true;    //默认展开
    boolean leaf;               //是否叶子节点


    private String parentId;

    public TreeEntity(){
        super();
    }

    public TreeEntity(String id){
        super(id);
    }
}
