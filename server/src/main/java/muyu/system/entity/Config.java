package muyu.system.entity;

import lombok.Data;
import muyu.system.common.tree.TreeNode;

import java.io.Serializable;
import java.util.List;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/10/20
 * @version: 1.0.0
 */


@Data
public class Config implements Serializable{
    private static final long serialVersionUID = 1L;

    List<Dict> dicts;
    List<TableColumn> tableColumns;
    List<Menu> menuList;
    TreeNode  menuTree;

    public void setMenuList(String rootId,List<Menu> menuList) {
        this.menuList = menuList;
        this.menuTree = TreeNode.createTree(rootId,menuList);
    }
}