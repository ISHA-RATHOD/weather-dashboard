import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  constructor(private http: HttpClient) {}

  // Current Weather API

  getCurrentWeather(city: string) {

    return this.http.get(

      `${environment.baseUrl}/weather?q=${city}&appid=${environment.apiKey}&units=metric`

    );

  }

  // Forecast API

  getForecast(city: string) {

    return this.http.get(

      `${environment.baseUrl}/forecast?q=${city}&appid=${environment.apiKey}&units=metric`

    );

  }

}