package muyu.system.common.service;

import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.ResultPageBean;
import muyu.system.common.persistence.TreeDao;
import muyu.system.common.persistence.TreeEntity;
import muyu.system.common.tree.TreeNode;
import muyu.system.common.utils.IdUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/26
 * @version: 1.0.0
 */

@Transactional(readOnly = true)
public abstract class TreeService<D extends TreeDao<T>, T extends TreeEntity<T>> extends CrudService<D,T>{

	@Value("${rootId}")
	private String rootId;

	public ResultPageBean<T> findTreePage(HttpServletRequest request,String rootId) {
		ResultPageBean<T> bean = new ResultPageBean<>(request);
		bean.setList(dao.findTree(rootId));
		return bean;
	}

	protected List<T> genId(List<T> list){
		list.forEach(t->{
			if(t.getIsNewRecord()){

				String id = t.getId();
				t.setId(IdUtils.genId());

				list.forEach(c->{
					if(c.getParentId()==null){
						c.setParentId(this.rootId);
					}else if(c.getParentId().equals(id)){
						c.setParentId(t.getId());
					}
				});
			}
		});

		return list;
	}

	public ResultBean<T> transform(String ids,String type){
		List<T> list    = dao.findTree(this.rootId);
		Set<String> set 	= new HashSet<>(Arrays.asList(ids.split(",")));
		TreeNode root = TreeNode.createTree(this.rootId,list);

		switch (type){
			case "升级":
				root.upgrade(set);
				break;
			case "降级":
				root.degrade(set);
				break;
			case "上移":
				root.up(set);
				break;
			case "下移":
				root.down(set);
				break;
			default:
				return new ResultBean<>("未定义的层级操作",false);
		}

		root.getUpdateList().forEach(t->super.save((T)t));

		return new ResultBean<>("操作成功",true);
	}


}
