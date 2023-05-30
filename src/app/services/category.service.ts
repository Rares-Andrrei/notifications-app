import { ObserversModule } from '@angular/cdk/observers';
import { Injectable } from '@angular/core';
import { Category } from '../category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  baseURL: string = "https://newsapi20221108120432.azurewebsites.net/api/Categories"

  constructor(private http: HttpClient) { }
  
  getCategories() : Observable<Category[]>{
    return this.http.get<Category[]>(this.baseURL);
  }
  
}
