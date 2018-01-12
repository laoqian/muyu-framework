/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package muyu.system.utils;


import muyu.system.security.SecurityUser;
import muyu.system.entity.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.session.Session;


/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/14
 * @version: 1.0.0
 */
public class UserUtils{

	private static int onlineCount = 0;

	public static User getUser(){
		Object object = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return object instanceof SecurityUser? (SecurityUser)object:null;
	}

	public static void online(){
		onlineCount++;
	}

	public static void offline(){
		if(onlineCount>0){
			onlineCount--;
		}
	}

	public static int getOnlineCount(){
		return onlineCount;
	}
}
