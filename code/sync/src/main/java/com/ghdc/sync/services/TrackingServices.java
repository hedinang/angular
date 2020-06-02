package com.ghdc.sync.services;

import com.ghdc.sync.core.AMQPMessage;
import com.ghdc.sync.core.db.CRUDService;
import com.ghdc.sync.model.InCome;
import com.ghdc.sync.model.Tracking;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;


@Service
public class TrackingServices extends CRUDService<Tracking, Long> {
    public static final Type TYPE_TOKEN = new TypeToken<AMQPMessage<Tracking>>() {}.getType();
    @RabbitListener(queues = "Tracking")
    public void receiveAddress(Message message) {
        String json = new String(message.getBody());
        AMQPMessage<Tracking> amqpMessage = new Gson().fromJson(json, TYPE_TOKEN);
        String id = syncOne(amqpMessage.db, amqpMessage);
        System.out.println("\n" + amqpMessage.type + " Tracking with id = " + id);
    }

    private String syncOne(String db, AMQPMessage<Tracking> amqpMessage) {
        if (amqpMessage.type.equals("CREATE")) {
            /*tạo mới 1 bản ghi*/
            Tracking resultCreate = create(0, db, amqpMessage.data).orElse(null);
            if (resultCreate != null) {
                Map<String, Object> request = convert(resultCreate);
                affiliateRestTemplate.putForObject(urlES + "/tracking/_doc/" + resultCreate.getId(), new Gson().toJson(request), String.class);
                return String.valueOf(amqpMessage.data.getId());
            }else {
                System.out.println("Tracking => Thực hiện tạo bản ghi trên db lỗi!");
                return null;
            }
        } else if (amqpMessage.type.equals("UPDATE")) {
            /*update bản ghi es */
            Map<String, Object> request = convert(amqpMessage.data);
            affiliateRestTemplate.putForObject(urlES + "/tracking/_doc/" + amqpMessage.data.getId(), new Gson().toJson(request), String.class);
            return String.valueOf(amqpMessage.data.getId());
        } else {
            System.out.println("Tracking => Không biết hành động thực hiện!");
            return null;
        }
    }

    public void syncAll(String dbName) {
        List<Tracking> trackings = this.getAll(dbName);
        for (int i = 0; i < 10995; i++) {
            AMQPMessage<Tracking> amqpMessage = new AMQPMessage<>();
            amqpMessage.type = "UPDATE";
            amqpMessage.data = trackings.get(i);
            amqpMessage.db = dbName;
            String id = syncOne(dbName, amqpMessage);
            System.out.println("Sync tracking ====> "+id);
        }
        System.out.print("\rTRACKING completed");
    }


    @SuppressWarnings("unchecked")
    private Map<String, Object> convert(Tracking tracking) {
        return objectMapper.convertValue(tracking, Map.class);
    }

}
