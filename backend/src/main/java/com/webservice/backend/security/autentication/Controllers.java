package com.webservice.backend.security.autentication;

import com.webservice.backend.security.autentication.model.AuthenticationRequest;
import com.webservice.backend.security.autentication.model.AuthenticationResponse;
import com.webservice.backend.services.users.UserSecurityInformation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controllers {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserSecurityInformation userSecurityInformation;

    @Autowired
    private JwtHelper jwtHelper;

    @RequestMapping("/hello")
    public String hello() {
        return "Hello World";
    }

    @RequestMapping(value="/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> creatAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
                throw new Exception("Usuário ou senha incorreta", e);
            }


        final UserDetails userDetails = userSecurityInformation
                .loadUserByUsername(authenticationRequest.getUsername());

        final String jwt = jwtHelper.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));

    }


}
