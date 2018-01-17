package muyu.system.config;

import muyu.system.common.beans.ResultBean;
import muyu.system.entity.User;
import muyu.system.security.AuthenticationProviderCustom;
import muyu.system.security.CustomUserDetailsServiceImpl;
import muyu.system.security.SecurityUser;
import muyu.system.service.UserService;
import muyu.system.utils.*;
import muyu.system.websocket.OnlineEventPublisher;
import org.mybatis.spring.boot.autoconfigure.MybatisAutoConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.session.HttpSessionEventPublisher;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Date;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/21
 * @version: 1.0.0
 */

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true,prePostEnabled=true,jsr250Enabled = true)
@AutoConfigureAfter(MybatisAutoConfiguration.class)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private class LogoutSucessHandle implements LogoutSuccessHandler{

        @Override
        public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
            ResultBean<SecurityUser> resultBean = new ResultBean<>();
            resultBean.setData((SecurityUser)authentication.getPrincipal());
            HttpUtils.sendResponse(response,resultBean);
        }
    }

    private class AuthFailureHandler implements AuthenticationFailureHandler {
        @Override
        public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
            ResultBean resultBean = new ResultBean(exception);
            User user = new User();

            user.setAuthErrorNum((Integer) CacheUtils.get(request.getRemoteAddr(),"attempNum"));
            resultBean.setData(user);
            
            HttpUtils.sendResponse(response,resultBean);
        }
    }

    private class AuthSuccessHandler implements AuthenticationSuccessHandler {
        @Override
        public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
            ResultBean<SecurityUser> resultBean = new ResultBean<>();
            SecurityUser user  = (SecurityUser)authentication.getPrincipal();
            resultBean.setData(user);

            RedisUtils.del(request.getRemoteAddr()); /*删除缓存的验证信息等*/

            UserService userService = ContextUtils.getBean(UserService.class);
            user.setLoginDate(new Date());
            user.setLoginIp(request.getRemoteAddr());
            userService.save(user);
            userService.loginCountIncrease(user);
            HttpUtils.sendResponse(response,resultBean);
        }
    }


    @Autowired
    CustomUserDetailsServiceImpl customUserDetailsService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/api/db/*").permitAll()
                .antMatchers("/api/*").authenticated()
                .and()
                .formLogin()
                .loginPage("/api/login")
                .successHandler(new AuthSuccessHandler())
                .failureHandler(new AuthFailureHandler())
                .and()
                .logout()
                .logoutUrl("/api/logout")
                .logoutSuccessHandler(new LogoutSucessHandle())
                .and()
                .csrf()
                .disable()
                .sessionManagement()
                .maximumSessions(1)
//                .maxSessionsPreventsLogin(true)
        ;
    }

    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return new ProviderManager(Arrays.asList(new AuthenticationProviderCustom(customUserDetailsService)));
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customUserDetailsService);
    }

    @Bean
    public HttpSessionEventPublisher httpSessionEventPublisher() {
        return new OnlineEventPublisher();
    }
}
