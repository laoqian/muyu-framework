/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package muyu.model;


import muyu.common.persistence.DataEntity;

/**
 * 区域Entity
 * @author ThinkGem
 * @version 2013-05-15
 */
public class Area extends DataEntity<Area> {

	private static final long serialVersionUID = 1L;
	private String code; 	// 区域编码
	private String type; 	// 区域类型（1：国家；2：省份、直辖市；3：地市；4：区县）
	

}