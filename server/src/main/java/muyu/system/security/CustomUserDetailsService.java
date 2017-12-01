package muyu.system.security;

import muyu.system.dao.MenuDao;
import muyu.system.dao.RoleDao;
import muyu.system.dao.UserDao;
import muyu.system.entity.Menu;
import muyu.system.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CustomUserDetailsService implements UserDetailsService{

    @Autowired
    UserDao userDao;

    @Autowired
    RoleDao roleDao;

    @Autowired
    MenuDao menuDao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        SecurityUser securityUser = userDao.getUser(username);
        if(securityUser!=null){

            /*查找用户角色列表*/
            Role role = new Role();
            role.getSqlMap().put("userId",securityUser.getId());
            List<Role> roleList = roleDao.findList(role);
            securityUser.setRoleList(roleList);


            /*查找用户菜单权限列表*/
            StringBuilder roleIds = new StringBuilder();
            roleList.forEach(r->roleIds.append(r.getId()).append(","));
            if(roleIds.length()>0){
                roleIds.deleteCharAt(roleIds.length()-1);
                Menu menu = new Menu();
                menu.getSqlMap().put("roleIds",roleIds.toString());
                List<Menu> menuList = menuDao.findList(menu);

                securityUser.setMenuList(menuList);
            }
        }

        return securityUser;
    }
}
