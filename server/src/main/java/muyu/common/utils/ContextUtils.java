package muyu.common.utils;

import org.springframework.context.ApplicationContext;

public class ContextUtils {
    public static ApplicationContext ctx;

    public static Object getObject(Class clazz){
        return ctx.getBean(clazz);
    }
}
