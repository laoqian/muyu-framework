/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package muyu.system.common.utils;


import muyu.system.common.security.SecurityUser;
import muyu.system.entity.User;
import org.springframework.security.core.context.SecurityContextHolder;


/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/14
 * @version: 1.0.0
 */
public class UserUtils{

	public static final String USER_CACHE = "userCache";
	public static final String USER_CACHE_ID_ = "id_";
	public static final String USER_CACHE_LOGIN_NAME_ = "ln";
	public static final String USER_CACHE_LIST_BY_OFFICE_ID_ = "oid_";


	public static User getUser(){
		Object object = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		return (SecurityUser) object;
	}

}
