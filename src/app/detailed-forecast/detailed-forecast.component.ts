import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { Forecast } from '../forecast';
import { WeatherService } from '../weather.service';
import { CurrentComponent } from '../current/current.component';
import { Searched } from '../searchedWeather';
import { DataService } from '../data.service';

@Component({
  selector: 'app-detailed-forecast',
  templateUrl: './detailed-forecast.component.html',
  styleUrls: ['./detailed-forecast.component.scss']
})
export class DetailedForecastComponent implements OnInit {

  constructor(private weatherService: WeatherService, private data: DataService) { }
  forecastForm: FormGroup;
  cityForecast: Forecast[] = [];
  input: string;

  ngOnInit() {
    this.forecastForm = new FormGroup({
      forecastCity: new FormControl('Novi Sad')
    });

    this.data.citySearch.subscribe(input => this.input = input);
    this.cityForecast.splice(0, this.cityForecast.length);
    this.weatherService.fiveDayForecast(this.input).subscribe(
      (data) => {
        for (let i = 0; i < data.list.length; i += 8) {
          const temporary = new Forecast(data.list[i].dt_txt,
                                        data.list[i].weather[0].icon,
                                        data.list[i].main.temp,
                                        data.list[i].main.temp_max,
                                        data.list[i].main.temp_min);
        this.cityForecast.push(temporary);
        }
      });
  }

  onSubmitFiveDay(v: NgForm) {
    this.cityForecast.splice(0, this.cityForecast.length);
    this.weatherService.fiveDayForecast(v.value.city).subscribe(
      (data) => {
        console.log(data);
        for (let i = 0; i < data.list.length; i += 8) {
          const temporary = new Forecast(data.list[i].dt_txt,
                                        data.list[i].weather[0].icon,
                                        data.list[i].main.temp,
                                        data.list[i].main.temp_max,
                                        data.list[i].main.temp_min);
        this.cityForecast.push(temporary);
        }
      }
    );
  }
}

