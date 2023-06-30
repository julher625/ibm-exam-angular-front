import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class KeyService {

  private baseUrl: string="http://localhost:8000/llaves";

  constructor(private _http:HttpClient) {  }

  getKeys(){
    return this._http.get<string>(this.baseUrl);
  }
}
