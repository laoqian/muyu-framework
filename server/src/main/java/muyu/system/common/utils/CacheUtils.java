package muyu.system.common.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.cache.RedisCacheManager;



/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/10/20
 * @version: 1.0.0
 */

public class CacheUtils {
	
	private static Logger logger = LoggerFactory.getLogger(CacheUtils.class);

	private static final String SYS_CACHE 			= "sysCache";
	public static final String CACHE_ROLE_LIST 		= "roleList";
	public static final String CACHE_MENU_LIST 		= "menuList";
	public static final String CACHE_AREA_LIST 		= "areaList";
	public static final String CACHE_OFFICE_LIST 	= "officeList";

	private static final String USER_CACHE 			= "userCache";
	private static final String USER_CACHE_ID_ 		= "id_";

	private static RedisCacheManager redisCacheManager = ContextUtils.getBean(RedisCacheManager.class);


	private static void put(String cacheName,String key,Object value){
		redisCacheManager.getCache(cacheName).put(key,value);
	}

	private static <T> T get(String cacheName,String key,Class<T> type){
		return redisCacheManager.getCache(cacheName).get(key,type);
	}

	public static void remove(String cacheName,String key){
		redisCacheManager.getCache(cacheName).evict(key);
	}

	public static void clear(String cacheName){
		redisCacheManager.getCache(cacheName).clear();
	}

	public static void putGlobalCache(String key,Object value){
		put(SYS_CACHE,key,value);
	}

	public static<T> T  getGlobalCache(String key,Class<T> type){
		return get(SYS_CACHE,key,type);
	}

	public static void putUserCache(String key,Object value){
		put(USER_CACHE,getUserKey(key),value);
	}

	public static <T> T getUserCache(String key,Class<T> type){
		return get(USER_CACHE,getUserKey(key),type);
	}

	private static String getUserKey(String key){
		return USER_CACHE_ID_ + UserUtils.getUser().getId() + "_" + key;
	}
}
