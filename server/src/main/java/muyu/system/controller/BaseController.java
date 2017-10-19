package muyu.system.controller;

import muyu.system.common.beans.ResultBean;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Validator;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/14
 * @version: 1.0.0
 */
public class BaseController {

    /**
     * 日志对象
     */
    protected Logger logger = LoggerFactory.getLogger(getClass());

    /**
     * 验证Bean实例对象
     */
//    @Autowired
//    protected Validator validator;

    /**
     * 管理基础路径
     */
//    @Value("${adminPath}")
    protected String adminPath;

    @ExceptionHandler
    public ResultBean<Exception> exception(Exception ex){
        ResultBean<Exception> bean = new ResultBean<>();

        bean.setCode(ResultBean.FAIL);
        bean.setMsg(ex.getMessage());
        return bean;
    }
}
