package com.PEIN;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class Response<T> {
    private T data;

    public static <T> Response<T> succes(T data) {
        return new Response<T>(data);
    }
}
