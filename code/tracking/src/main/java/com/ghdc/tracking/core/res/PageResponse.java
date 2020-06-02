package com.ghdc.tracking.core.res;

import java.io.Serializable;
import java.util.List;

public class PageResponse<T> implements Serializable {
    public List<T> list;
    public int page;
    public int total;
    public int limit;
}
