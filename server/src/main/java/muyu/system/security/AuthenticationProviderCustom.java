package muyu.system.security;

import muyu.system.utils.CacheUtils;
import muyu.system.utils.ContextUtils;
import muyu.system.utils.RedisUtils;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import java.util.Map;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/23
 * @version: 1.0.0
 */
public class AuthenticationProviderCustom implements AuthenticationProvider {

    private static final int MAX_ATTEMPTS = 3;

    private final UserDetailsService userDetailsService;

    public AuthenticationProviderCustom(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) authentication;
        String username = token.getName();
        //从数据库找到的用户
        UserDetails userDetails = null;
        if(username != null) {
            userDetails = userDetailsService.loadUserByUsername(username);
        }

        if(userDetails == null) {
            throw new UsernameNotFoundException("用户不存在");
        }else if (!userDetails.isEnabled()){
            throw new DisabledException("用户已被禁用");
        }else if (!userDetails.isAccountNonExpired()){
            throw new AccountExpiredException("账号已过期");
        }else if (!userDetails.isAccountNonLocked()) {
            throw new LockedException("账号已被锁定");
        }else if (!userDetails.isCredentialsNonExpired()) {
            throw new LockedException("凭证已过期");
        }
        //数据库用户的密码
        String password = userDetails.getPassword();
        WebAuthenticationDetails details = (WebAuthenticationDetails)authentication.getDetails();
        String cacheName = details.getRemoteAddress();

        long num = CacheUtils.increase(cacheName,"attempNum"); /*尝试次数*/
        //与authentication里面的credentials相比较
        if(!password.equals(token.getCredentials())) {
            if(num>MAX_ATTEMPTS){
                throw new MaxAuthedNumLimitException("用户名/密码无效："+num);
            }

            throw new BadCredentialsException("用户名/密码无效："+num);
        }

        if(num>MAX_ATTEMPTS){
            HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
            String code  = request.getParameter("code");
            String cachedCode = (String)CacheUtils.get(cacheName,"code");

            if(!cachedCode.equals(code)){
                throw new MaxAuthedNumLimitException("验证码错误："+num);
            }
        }

        return new UsernamePasswordAuthenticationToken(userDetails,password,userDetails.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        //返回true后才会执行上面的authenticate方法,这步能确保authentication能正确转换类型
        return UsernamePasswordAuthenticationToken.class.equals(authentication);
    }
}