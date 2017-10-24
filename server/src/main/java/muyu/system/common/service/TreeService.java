package muyu.system.common.service;

import muyu.system.common.beans.ResultBean;
import muyu.system.common.beans.ResultPageBean;
import muyu.system.common.persistence.TreeDao;
import muyu.system.common.persistence.TreeEntity;
import muyu.system.entity.Menu;
import org.springframework.transaction.annotation.Transactional;
import javax.servlet.http.HttpServletRequest;

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

	public ResultPageBean<T> findTreePage(HttpServletRequest request,String rootId) {
		ResultPageBean<T> bean = new ResultPageBean<>(request);
		bean.setList(dao.findTree(rootId));
		return bean;
	}

	public ResultBean<T> chgLevel(T t,Integer type){
		switch (type){
			case 0:
				T parent = dao.get(t.getParentId());
				if(parent!=null){
					t.setParentId(parent.getParentId());
					dao.update(t);
				}
				break;
			case 1:

				break;
			case 2:

				break;
			case 3:

				break;
			default:
				return new ResultBean("未定义的层级操作",false);
		}


		return new ResultBean("操作成功",true);
	}
}
