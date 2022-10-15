package com.elec5619.student.forum.Controller;

import com.elec5619.student.forum.util.JsonReturnType;
import com.google.api.client.json.Json;
import com.google.gson.JsonObject;
import io.grpc.internal.JsonUtil;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.security.Principal;

@Controller
@RequestMapping("/weather")
public class WeatherController {

    @GetMapping("/")
    @ResponseBody
    public JsonReturnType GetWeather() throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://aerisweather1.p.rapidapi.com/observations/Sydney,%20Australia"))
                .header("X-RapidAPI-Key", "ed571b3739msh39e3112063195c1p136ce9jsn6ce6f3e542d0")
                .header("X-RapidAPI-Host", "aerisweather1.p.rapidapi.com")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        JsonReturnType jsonReturnType = JsonReturnType.successReturn();
        String weather = response.body();
        System.out.println(response.body());
        int i = weather.indexOf("weather");
        weather = weather.substring(i);
        weather = weather.substring(0,weather.indexOf(","));
        weather = weather.substring(10);
        weather = weather.substring(0,weather.indexOf("\""));
        jsonReturnType.getData().put("weather",weather);
        return jsonReturnType;
    }
}
