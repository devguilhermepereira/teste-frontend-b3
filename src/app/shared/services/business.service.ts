import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  private urlApi = environment.url_api;

  constructor(private httpClient: HttpClient) { }

  get() {
    return this.httpClient.get(this.urlApi + '/contas');
  }

  save(data: any) {
    return this.httpClient.post(this.urlApi + '/contas', data);
  }

  getDolar() {
    return this.httpClient.get('https://economia.awesomeapi.com.br/json/last/USD-BRL');
  }
}
