package muyu.system.web;

import com.fasterxml.jackson.core.JsonProcessingException;
import muyu.system.common.beans.ResultBean;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MaxUploadSizeExceededException;


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


    @ResponseBody
    @ExceptionHandler(Exception.class)
    public ResultBean<String> ExceptionHandler(Exception ex) throws JsonProcessingException {
        ResultBean<String> resultBean ;

        if (ex instanceof MaxUploadSizeExceededException) {
            resultBean = new ResultBean<>("文件导入超过最大字节限制",false);
        }else {
            resultBean = new ResultBean<>("出现异常信息:"+ex.getLocalizedMessage(),false);
        }

        return resultBean;
    }
}
