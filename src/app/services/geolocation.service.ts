import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  private url = "http://ip-api.com/json";
  constructor(private http: Http) { }

  getCurrentLocation(){
    return this.http.get(this.url)
  }
}
