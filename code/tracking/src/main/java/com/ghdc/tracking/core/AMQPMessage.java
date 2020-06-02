package com.ghdc.tracking.core;

public class AMQPMessage<T> {
    public String db;
    public T data;
    public String type;
}
