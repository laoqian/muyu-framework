package muyu.system.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.NoArgsConstructor;
import muyu.system.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

/**
 * 千山鸟飞绝，万径人踪灭。
 * 孤舟蓑笠翁，独钓寒江雪。
 *
 * @author: 于其先
 * @date: 2017/9/21
 * @version: 1.0.0
 */

@NoArgsConstructor
public class SecurityUser extends User implements UserDetails {
    private static final long serialVersionUID = 1L;

    public SecurityUser(String id) {
        super(id);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){
        List<SimpleGrantedAuthority> list = new LinkedList<>();
        this.getRoleList().forEach(role -> list.add(new SimpleGrantedAuthority("ROLE_"+role.getEname())));
        this.getMenuList().stream().filter(menu -> menu.getPermission()!=null).forEach(menu -> list.add(new SimpleGrantedAuthority(menu.getPermission())));

        return list;
    }

    @JsonIgnore
    @Override
    public String getPassword() {
        return super.getPassword();
    }

    @Override
    public String getUsername() {
        return super.getLoginName();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
