package muyu.system.aop;

import muyu.system.common.beans.BaseResultBean;
import muyu.system.common.beans.ResultBean;
import muyu.system.common.exceptions.CheckException;
import muyu.system.common.exceptions.UnloginException;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/19
 * @version: 1.0.0
 */
@Aspect
@Component
public class ControllerAOP {
    private static final Logger logger = LoggerFactory.getLogger(ControllerAOP.class);

    @Pointcut("execution(public muyu.system.common.beans.* muyu.system.web..*.*(..))")
    public void resultAOP(){}

    @Around("resultAOP()")
    public Object handlerControllerMethod(ProceedingJoinPoint pjp){
        long startTime = System.nanoTime();
        BaseResultBean result;

        try {
            result = (BaseResultBean) pjp.proceed();
            double useTime = ((double)(System.nanoTime() - startTime))/1000000;
            result.setUseTime(useTime);
            logger.error(pjp.getSignature() + "控制器执行时间: " + useTime +" 毫秒");
        } catch (Throwable e) {
            result = handlerException(pjp, e);
        }

        return result;
    }

    private BaseResultBean handlerException(ProceedingJoinPoint pjp, Throwable e) {
        BaseResultBean result = new ResultBean();

        // 已知异常
        if (e instanceof CheckException) {
            result.setMsg(e.getLocalizedMessage());
            result.setCode(BaseResultBean.FAIL);
        } else if (e instanceof UnloginException) {
            result.setMsg("Unlogin");
            result.setCode(BaseResultBean.NO_LOGIN);
        } else {
            logger.error(pjp.getSignature() + " error ", e);

            //TODO 未知的异常，应该格外注意，可以发送邮件通知等
            result.setMsg(e.toString());
            result.setCode(BaseResultBean.FAIL);
        }

        return result;
    }
}
