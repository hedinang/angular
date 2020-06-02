package com.ghdc.affiliate.core.res;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@NoArgsConstructor
@Setter
@Getter
public class PageResponse<T> implements Serializable {
    private List<T> list;
    private int page;
    private int total;
    public int limit;
}
