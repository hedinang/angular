package com.ghdc.sync.controller;

import com.ghdc.sync.services.InComeServices;
import com.ghdc.sync.services.TrackingServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("sync")
public class SyncControllers {
    @Autowired
    InComeServices inComeServices;
    @Autowired
    TrackingServices trackingServices;
    @PostMapping("/income")
    public String syncAllIncome(){
        inComeServices.syncAll("tracking");
        return "done !";
    }

    @PostMapping("/tracking")
    public String syncAllTracking(){
        trackingServices.syncAll("tracking");
        return "done !";
    }
}
