package muyu.system.common.service;

import java.util.List;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import muyu.system.common.beans.ResultPageBean;
import muyu.system.common.persistence.CrudDao;
import muyu.system.common.persistence.DataEntity;
import muyu.system.common.utils.SequenceUtils;
import org.apache.commons.lang3.StringUtils;
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
public abstract class CrudService<D extends CrudDao<T>, T extends DataEntity<T>> extends BaseService {
	
	
	/**
	 * 持久层对象
	 */
	@Autowired
	protected D dao;

	/**
	 * 获取单条数据
	 * @param id
	 * @return
	 */
	public T get(String id) {
		return dao.get(id);
	}
	
	/**
	 * 获取单条数据
	 * @param entity
	 * @return
	 */
	public T get(T entity) {
		return dao.get(entity);
	}
	
	/**
	 * 查询列表数据
	 * @param entity
	 * @return
	 */
	public List<T> findList(T entity) {

		return dao.findList(entity);
	}
	
	/**
	 * 查询分页数据
	 * @param request 分页对象
	 * @param entity
	 * @return
	 */
	public ResultPageBean<T> findPage(HttpServletRequest request, T entity) {
		ResultPageBean<T> bean = new ResultPageBean<>(request);

		Page page = PageHelper.startPage(bean.getPageNum(),bean.getPageSize(),true,true,true);
		page.setOrderBy(bean.getOrderBy());
		bean.setList(findList(entity));
		bean.setPageCount(page.getPages());
		bean.setTotal(page.getTotal());

		return bean;
	}


	/**
	 * 保存数据（插入或更新）
	 * @param entity
	 */
	@Transactional(readOnly = false)
	public void save(T entity) {
		if (entity.getIsNewRecord()){
			entity.preInsert();
            if(StringUtils.isBlank(entity.getId())){
                entity.setId(SequenceUtils.getNextVal(null));
            }
			dao.insert(entity);
		}else{
			entity.preUpdate();
			dao.update(entity);
		}
	}


	/**
	 * 删除数据
	 * @param entity
	 */
	@Transactional(readOnly = false)
	public void delete(T entity) {
		dao.delete(entity);
	}

}
