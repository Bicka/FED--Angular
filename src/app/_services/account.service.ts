import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject } from 'rxjs';
import {map} from "rxjs/operators"
import { environment } from 'src/environments/environment';
import { User } from '../_models/users';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.credential;
  private currentUserSource = new ReplaySubject<User | null>(1);

  currentUser$ = this.currentUserSource.asObservable();


  constructor(private http: HttpClient, private toastr: ToastrService) 
  { 
    console.log(sessionStorage.getItem('user'))
  }

  login(model: any)
  {
    return this.http.get(this.baseUrl).pipe(
      map((response: any) => {
        const user : User[] = response.filter((item: any) => item.username === model.username && item.password === model.password);
        if(user.length === 1)
        {
          this.setCurrentUser(user[0]);
        }
        else 
          throw Error("Invalid credentials")
        
      })
    );
  }

  setCurrentUser(user: User)
  {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout () {
    sessionStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  register(model: any)
  {
    return this.http.post(this.baseUrl + "/register",model).pipe(
      map((user: any) => {
        if(user)
        {
          this.setCurrentUser(user);
        }
      })
    );
  }
}
