package com.ghdc.affiliate.controllers;

import com.ghdc.affiliate.core.AbstractController;
import com.ghdc.affiliate.services.CheckISPServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("isp")
public class ISPController extends AbstractController {
    @Autowired
    CheckISPServices checkISPServices;
    @PostMapping("/")
    public String getISPByIP(@RequestBody Test tes) {
        System.out.println(tes.ip);
        return checkISPServices.getIspByIP(affiliateConfig.getDbDefault(), tes.ip);
    }
}

class Test{
    public String ip;
}
