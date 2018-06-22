import { Injectable } from '@angular/core';
import { CurrentWeather } from './current-weather';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Forecast } from './forecast';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  myWeather: CurrentWeather ;
  location;

  constructor(private http: Http) { }

  localWeather() {
    return new Promise ((res, rej) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.location = pos.coords;
        const lat = this.location.latitude;
        const lon = this.location.longitude;
        return this.http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0e66f3fcb4b30271cd422942e81fd1be&units=metric`).pipe(map((response: Response) =>
      response.json())).toPromise().then(
        (data) => {
          this.myWeather = new CurrentWeather(data.name,
                                              data,
                                              data.main.temp,
                                              data.weather[0].description,
                                              data.main.humidity,
                                              data.wind.speed);
          res(this.myWeather);
        }
      );
      });
    });
  }
  searchedCity(city: string) {
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0e66f3fcb4b30271cd422942e81fd1be&units=metric`).pipe(map((response: Response) => 
    response.json()));
  }

  fiveDayForecast(city: string) {
    return this.http.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=0e66f3fcb4b30271cd422942e81fd1be&units=metric`).pipe(map((response: Response) => 
    response.json()));
  }
}
