package com.ghdc.affiliate.services;

import com.ghdc.affiliate.core.db.CRUDService;
import com.ghdc.affiliate.model.Isp;
import org.apache.commons.net.util.SubnetUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CheckISPServices extends CRUDService<Isp, Integer> {
    public String getIspByIP(String db, String ip) {
        System.out.println("ip "+ ip);
        List<Isp> ipsList = getAll(db);
        final String[] ipsStr = {"Other"};
        for (int i = 0; i < ipsList.size(); i++) {
            if (contains(ipsList.get(i).getIp(), ip )) {
                ipsStr[0] = ipsList.get(i).getIsp();
                break;
            }
        }
        return ipsStr[0];
    }

    static boolean contains(String subnet, String address) {

        SubnetUtils utils = new SubnetUtils(subnet);

        return utils.getInfo().isInRange(address);
    }
}
