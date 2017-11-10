package muyu.system.utils;

import org.springframework.context.ApplicationContext;


public class ContextUtils {
    public static ApplicationContext ctx;


    public static <T> T getBean(Class<T> clazz){
        return ctx.getBean(clazz);
    }
}
