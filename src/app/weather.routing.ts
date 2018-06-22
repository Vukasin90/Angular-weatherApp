import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CurrentComponent } from './current/current.component';
import { DetailedForecastComponent } from './detailed-forecast/detailed-forecast.component';
import { ResolveLocationService } from './resolve-location.service';

const WEATHER_ROUTER: Routes = [
    {path: '', component: CurrentComponent, resolve: {myWeather: ResolveLocationService} },
    {path: 'forecast', component: DetailedForecastComponent, resolve: {myFiveDay: ResolveLocationService}}
];

export const weatherRouting: ModuleWithProviders = RouterModule.forRoot(WEATHER_ROUTER);
