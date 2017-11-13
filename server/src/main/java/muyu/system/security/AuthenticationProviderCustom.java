package muyu.system.security;

import muyu.system.utils.RedisUtils;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetails;

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
        //
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

        //与authentication里面的credentials相比较
        if(!password.equals(token.getCredentials())) {
            WebAuthenticationDetails details = (WebAuthenticationDetails)authentication.getDetails();
            String key = details.getRemoteAddress() + "-attempCount";
            long num = RedisUtils.increase(key,1);
            if(num>MAX_ATTEMPTS){
                throw new BadCredentialsException("超过登陆次数限制，请稍后再试："+num);
            }

            throw new BadCredentialsException("用户名/密码无效："+num);
        }
        //授权
        return new UsernamePasswordAuthenticationToken(userDetails,password,userDetails.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        //返回true后才会执行上面的authenticate方法,这步能确保authentication能正确转换类型
        return UsernamePasswordAuthenticationToken.class.equals(authentication);
    }
}