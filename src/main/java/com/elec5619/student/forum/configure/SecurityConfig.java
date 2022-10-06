package com.elec5619.student.forum.configure;

import com.elec5619.student.forum.services.ForumUserDetailService;
import com.elec5619.student.forum.util.JwtAuthenticationEntryPoint;
import com.elec5619.student.forum.util.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private ForumUserDetailService userDetailsService;


    @Autowired
    private JwtAuthenticationEntryPoint unauthorizedHandler;

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());

    }

    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

   /* protected  void configure(HttpSecurity http) throws Exception {
          http.logout().logoutUrl("/url").logoutSuccessUrl("/url").permitAll();
          http.exceptionHandling().accessDeniedPage("/unauthUrl");
          http.formLogin().loginPage("/loginurl").loginProcessingUrl("/loginProcessorUrl")
                  .defaultSuccessUrl("successURL").permitAll()
                  .and().authorizeHttpRequests().antMatchers("").permitAll()
                  .anyRequest().authenticated().and().csrf().disable();

    }*/
   protected void configure(HttpSecurity http) throws Exception {
       http.cors().and().csrf().disable().exceptionHandling()
               .authenticationEntryPoint(unauthorizedHandler).and()
               .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
               .and().authorizeRequests()
               .antMatchers("/",
                       "/favicon.ico",
                       "/**/*.png",
                       "/**/*.gif",
                       "/**/*.svg",
                       "/**/*.jpg",
                       "/**/*.html",
                       "/**/*.dox",
                       "/**/*.docx",
                       "/**/*.txt",
                       "/**/*.jsx",
                       "/**/*.css",
                       "/**/*.js")
               .permitAll().antMatchers("/auth/**").permitAll()
               .antMatchers("/api/user/checkUsernameAvailability", "/api/user/checkEmailAvailability").permitAll()
               .anyRequest().authenticated();

       http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

   }

    @Bean
    public PasswordEncoder passwordEncoder(){
    return new BCryptPasswordEncoder();
}

}
