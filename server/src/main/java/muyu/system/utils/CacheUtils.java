package muyu.system.utils;

import java.util.HashMap;
import java.util.Map;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/11/13
 * @version: 1.0.0
 */
public class CacheUtils{

    public static Map get(String cache){
        return RedisUtils.hmget(cache);
    }

    public static boolean set(String cache,Map map){
        return RedisUtils.hmset(cache,map);
    }

    public static Object get(String cache,String key){
        return RedisUtils.hget(cache,key);
    }

    public static long increase(String cache,String key){
        Integer value  = (Integer)RedisUtils.hget(cache,key);
        if(value==null){
            value = 0;
        }
        RedisUtils.hset(cache,key,++value);
        return value;
    }

    public static boolean set(String cache,String key,Object value){
        return RedisUtils.hset(cache,key,value);
    }
}
