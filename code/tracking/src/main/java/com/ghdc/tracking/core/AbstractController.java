package com.ghdc.tracking.core;

import com.ghdc.tracking.config.affiliate.AffiliateConfig;
import com.ghdc.tracking.services.DTOServices;
import com.google.gson.Gson;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class AbstractController {
    @Autowired
    protected AffiliateConfig affiliateConfig;
    @Autowired
    protected DTOServices dtoServices;
    @Autowired
    RabbitTemplate rabbitTemplate;
    protected <T> void putToRabbit(String idSession, String type, T data, Class<?> cls) {
        try {
            if (data != null) {
                AMQPMessage<T> esMessageSync = new AMQPMessage<>();
                esMessageSync.db = idSession;
                esMessageSync.data = data;
                esMessageSync.type = type;
                System.out.println("putting => "+ cls.getSimpleName());
                String body = new Gson().toJson(data);
                System.out.println(body);
                rabbitTemplate.convertAndSend("AFFILIATE", cls.getSimpleName(), new Gson().toJson(esMessageSync));
            }
        } catch (Exception e) {
            System.out.println(e.getStackTrace());
            System.out.println("Không tồn tại queue!");
        }
    }
}
