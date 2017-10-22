package muyu.system.common.service;

import muyu.system.common.beans.ResultPageBean;
import muyu.system.common.persistence.TreeDao;
import muyu.system.common.persistence.TreeEntity;
import org.springframework.beans.factory.annotation.Autowired;
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
public abstract class TreeService<D extends TreeDao<T>, T extends TreeEntity<T>> extends CrudService{

	@Autowired
	protected  D dao;

	public ResultPageBean<T> findTreePage(HttpServletRequest request,String rootId) {
		ResultPageBean<T> bean = new ResultPageBean<>(request);
		bean.setList(dao.findTree(rootId));
		return bean;
	}
}
