package muyu.system.common.persistence;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private int level;                  //当前层级
    private boolean expanded = false;    //默认展开
    private boolean leaf;               //是否叶子节点
    private String name ;               //
    private Integer sort=10; 	            // 排序

    @JsonIgnore
    private boolean isUpdated = false;          //是否需要更新

    private String parentId="0";

    public TreeEntity(){
        super();
    }

    public TreeEntity(String id){
        super(id);
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public void update(){
        this.isUpdated = true;
    }
}
