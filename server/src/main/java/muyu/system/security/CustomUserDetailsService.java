package muyu.system.security;

import muyu.system.common.beans.ResultBean;
import muyu.system.dao.RoleDao;
import muyu.system.dao.UserDao;
import muyu.system.entity.Role;
import muyu.system.entity.UserRole;
import muyu.system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class CustomUserDetailsService implements UserDetailsService{

    @Autowired
    UserDao userDao;

    @Autowired
    RoleDao roleDao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        SecurityUser securityUser = userDao.getUser(username);
        List<UserRole> list = userDao.findUserRoleList(securityUser.getId());
        List<Role> roleList = new ArrayList<>();
        list.forEach(userRole ->roleList.add(roleDao.get(userRole.getRoleId())));

        securityUser.setRoleList(roleList);
        return securityUser;
    }
}
