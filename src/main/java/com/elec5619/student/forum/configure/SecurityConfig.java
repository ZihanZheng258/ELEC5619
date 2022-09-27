package com.elec5619.student.forum.configure;

import com.elec5619.student.forum.services.ForumUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private ForumUserDetailService userDetailsService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

   /* protected  void configure(HttpSecurity http) throws Exception {
          http.logout().logoutUrl("/url").logoutSuccessUrl("/url").permitAll();
          http.exceptionHandling().accessDeniedPage("/unauthUrl");
          http.formLogin().loginPage("/loginurl").loginProcessingUrl("/loginProcessorUrl")
                  .defaultSuccessUrl("successURL").permitAll()
                  .and().authorizeHttpRequests().antMatchers("").permitAll()
                  .anyRequest().authenticated().and().csrf().disable();

    }*/

    @Bean
    public PasswordEncoder passwordEncoder(){
    return new BCryptPasswordEncoder();
}

}
