import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private cityInput = new BehaviorSubject<string>('Novi Sad');
  citySearch = this.cityInput.asObservable();

  constructor() { }

  changeInput(input: string) {
    this.cityInput.next(input);
  }
}
