import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { WeatherService } from '../weather.service';
import { CurrentWeather } from '../current-weather';
import { Searched } from '../searchedWeather';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {
  myWeather: CurrentWeather;
  searchedWeather: Searched;
  input: string;

  today: any = new Date();
  dd: any = this.today.getDate();
  locale = 'en-us';
  mm: any = this.today.toLocaleString(this.locale, {month: 'long'});
  todayDate: any = this.mm + ' ' + this.dd;

  constructor(private ws: WeatherService, private route: ActivatedRoute, private data: DataService) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: {myWeather: CurrentWeather}) => {
        this.myWeather = data.myWeather;
      }
    );
  }

  onSubmit(weatherForm: NgForm) {
    this.ws.searchedCity(weatherForm.value.city).subscribe(
      (data) => {
        this.searchedWeather = new Searched(data.name,
                                            data,
                                            data.main.temp,
                                            data.weather[0].description,
                                            data.main.humidity,
                                            data.wind.speed);
      }
    );
    this.data.citySearch.subscribe(input => this.input = weatherForm.value.city);
    this.data.changeInput(this.input);
  }
}
