package com.ghdc.affiliate.jwt;

import com.ghdc.affiliate.config.affiliate.AffiliateConfig;
import com.ghdc.affiliate.model.group.Group;
import com.ghdc.affiliate.model.permission.Permission;
import com.ghdc.affiliate.model.permission.PermissionResponse;
import com.ghdc.affiliate.model.user.User;
import com.ghdc.affiliate.services.GroupPermissionServices;
import com.ghdc.affiliate.services.GroupServices;
import com.ghdc.affiliate.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class JwtUserDetailsService implements UserDetailsService {
    @Autowired
    UserServices userServices;
    @Autowired
    GroupPermissionServices groupPermissionServices;
    @Autowired
    GroupServices groupServices;
    @Autowired
    AffiliateConfig affiliateConfig;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userServices.findByUserName("tracking", username)
                .orElseThrow(() -> new UsernameNotFoundException("Username: " + username + " not found"));
        return new JwtUserDetails(user, getAuthority(user.getGroupId()));
    }

    private Set<GrantedAuthority> getAuthority(Integer groupId) {
        Set<GrantedAuthority> grantedAuthority = new HashSet<>();
        Group group = groupServices.read(affiliateConfig.getDbDefault(), groupId).orElse(null);
        if (group != null){
            grantedAuthority.add(new SimpleGrantedAuthority(group.getCode()));// add permission vao xac thuc api
            List<Permission> permissions = groupPermissionServices
                    .getPermissionByGroupId(affiliateConfig.getDbDefault(), groupId);
            permissions.forEach(permission -> {
                grantedAuthority.add(new SimpleGrantedAuthority(permission.getCode()));// add permission vao xac thuc api
            });
        }

        return grantedAuthority;
    }
}