package com.ghdc.tracking.core.res;

public class MessageResponse {
    public int status;
    public String message;

    public MessageResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
