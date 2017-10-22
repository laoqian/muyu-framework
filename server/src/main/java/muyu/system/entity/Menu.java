
package muyu.system.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import muyu.system.common.persistence.TreeEntity;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/10/20
 * @version: 1.0.0
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class Menu extends TreeEntity<Menu> {

	private static final long serialVersionUID = 1L;
	private String parentIds; // 所有父级编号
	private String name; 	// 名称
	private String href; 	// 链接
	private String target; 	// 目标
	private String icon; 	// 图标
	private Integer sort; 	// 排序
	private String isShow; 	// 是否在菜单中显示（1：显示；0：不显示）
	private String permission; // 权限标识
	
	private String userId;

	public Menu(){
		super();
	}
	public Menu(String id){
		super(id);
	}
}