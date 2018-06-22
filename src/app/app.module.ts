import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { CurrentComponent } from './current/current.component';
import { DetailedForecastComponent } from './detailed-forecast/detailed-forecast.component';
import { weatherRouting } from './weather.routing';
import { WeatherService } from './weather.service';
import { ResolveLocationService } from './resolve-location.service';

@NgModule({
  declarations: [
    AppComponent,
    CurrentComponent,
    DetailedForecastComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    weatherRouting
  ],
  providers: [WeatherService, ResolveLocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
