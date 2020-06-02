package com.ghdc.landingpage.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

	@GetMapping("/index")
	public String index(Model model) {
		return "index";
	}

	@PostMapping("/tracks")
	public boolean click(HttpServletRequest request, @RequestBody String body) {
		System.out.println(request.getRemoteAddr());
		System.out.println(request.getHeader("uid"));
		System.out.println(body);
		return true;
	}

	@PutMapping(value = "/tracks/{sessionTracking}/isClicked")
	public boolean postMethodName(HttpServletRequest request, @PathVariable("sessionTracking") String sessionTracking,
			@RequestBody String body) {
		System.out.println(request.getRemoteAddr());
		System.out.println(request.getHeader("uid"));
		System.out.println(body);
		return true;
	}
}
