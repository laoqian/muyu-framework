package muyu.common.security;

import muyu.common.beans.ResultBean;
import muyu.common.utils.HttpUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/21
 * @version: 1.0.0
 */
public class AuthSuccessHandler implements AuthenticationSuccessHandler{
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        ResultBean<SecurityUser> resultBean = new ResultBean<>();
        resultBean.setData((SecurityUser)authentication.getPrincipal());
        HttpUtils.sendResponse(response,resultBean);
    }
}
