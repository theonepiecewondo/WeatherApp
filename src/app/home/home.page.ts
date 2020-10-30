import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data: any;
  test: any;
  error: string;
  location: any;
  current: any;
  condition: any;
  constructor(private http: HttpClient) {
    this.data = '';
    this.error = '';
    this.location = {
      name: "",
      region: "",
      country: "",
      lat: 0,
      lon: 0,
      tz_id: "",
      localtime_epoch: 0,
      localtime: "",
    };
    this.current = {
      temp_c: 0,
      temp_f: 0,
    };
    this.condition = {};
  }
  private prepareDataRequest(): Observable<object> {
    const dataUrl = 'http://api.weatherapi.com/v1/current.json?key=d7ab721567be42adaee215355203010&q=83501'
    return this.http.get(dataUrl);
    
  }
  ionViewWillEnter() {
    this.prepareDataRequest()
      .subscribe(
        data => {
          var temp = JSON.stringify(data);
          this.data = JSON.parse(temp);
          this.location = data['location'];
          this.current = data['current'];
          this.current.temp_c = Math.round(this.current.temp_c);
          this.condition = this.current['condition'];
          console.log(data);
          console.log(this.condition);
          
        },
        err => {
          this.error = 'An error occurred, the data could not be retrieved: Status: ${err.status}, Message: ${err.statusText}';
        }
      );
      
  }
}

