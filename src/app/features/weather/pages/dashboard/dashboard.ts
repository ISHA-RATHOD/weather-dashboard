import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  switchMap
} from 'rxjs';

import { WeatherService } from '../../../../core/services/weather.service';

@Component({
  selector: 'app-dashboard',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './dashboard.html',

  styleUrl: './dashboard.css'
})

export class DashboardComponent implements OnInit {

  city = 'Bengaluru';

  weatherData: any;

  forecastData: any;

  loading = false;

  errorMessage = '';

  searchSubject = new Subject<string>();

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {

    this.loadWeather(this.city);

    this.searchSubject.pipe(

      debounceTime(500),

      distinctUntilChanged(),

      switchMap((city) =>

        this.weatherService.getCurrentWeather(city)

      )

    )

    .subscribe({

      next: (res: any) => {

        this.weatherData = res;

      },

      error: () => {

        this.errorMessage = 'City not found';

      }

    });

  }

  searchCity(event: any) {

    const value = event.target.value;

    this.searchSubject.next(value);

    this.loadForecast(value);

  }

  loadWeather(city: string) {

    this.loading = true;

    this.errorMessage = '';

    this.weatherService.getCurrentWeather(city)

      .subscribe({

        next: (res: any) => {

          this.weatherData = res;

          this.loading = false;

        },

        error: () => {

          this.loading = false;

          this.errorMessage = 'Weather data failed';

        }

      });

    this.loadForecast(city);

  }

  loadForecast(city: string) {

    this.weatherService.getForecast(city)

      .subscribe({

        next: (res: any) => {

          this.forecastData = res;

        }

      });

  }

}