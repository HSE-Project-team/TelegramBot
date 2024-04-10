package ru.sloy.sloyorder.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping(method = RequestMethod.GET,
        value = "/test")
@RestController
public class MyController {
    @GetMapping()
    public String myEndpoint() {
        return "test";
    }

    @GetMapping("/word")
    public String word() {
        return "word";
    }
}
