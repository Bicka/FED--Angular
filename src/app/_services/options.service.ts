import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OptionsBeed, OptionsCategory } from '../_models/options';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  baseUrl = environment.apiUrl;
  optionsBreedCache = new Map();
  optionsCategoryCache = new Map();
  constructor(private http: HttpClient,) { }

  getOptionsBreed(){
    var response = this.optionsBreedCache.get('breeds');
    if(response)
    {
      return of(response);
    }
    return this.http
    .get<OptionsBeed[]>(this.baseUrl+"breeds",{ observe: 'response'})
    .pipe(
      map((response)=> {
        this.optionsBreedCache.set('breeds',response.body)
        return response.body
      })
    )
  }
  getOptionsCategory(){

    var response = this.optionsCategoryCache.get('categories');
    if(response)
    {
      return of(response);
    }
    return this.http
    .get<OptionsCategory[]>(this.baseUrl+"categories",{ observe: 'response'})
    .pipe(
      map((response)=> {
        this.optionsCategoryCache.set('categories',response.body)
        return response.body})
    )
  }
}
