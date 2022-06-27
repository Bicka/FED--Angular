import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/users';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs/operators';
@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let currentUser: User;
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      currentUser = user;
    });
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          'x-api-key': currentUser.key,
          'cache-control': 'public',
        },
      });
    } else {
      request = request.clone({
        setHeaders: {
          'x-api-key': '62d82132-d025-40e1-9109-d2cd8fdf734c',
          'cache-control': 'public',
        },
      });
    }
    return next.handle(request);
  }
}
