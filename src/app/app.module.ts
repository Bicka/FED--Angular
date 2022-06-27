import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiInterceptor } from './_interceptors/api.interceptor';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { SharedModule } from './_models/shared.module';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { TextInputsComponent } from './text-inputs/text-inputs.component';
import { CardListComponent } from './cardsComponents/card-list/card-list.component';
import { CardItemComponent } from './cardsComponents/card-item/card-item.component';
import { CardDetailsComponent } from './cardsComponents/card-details/card-details.component';
import { PasswordMeterComponent } from './password-meter/password-meter.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    RegisterComponent,
    LoginComponent,
    FavoritesComponent,
    NotFoundComponent,
    TextInputsComponent,
    CardListComponent,
    CardItemComponent,
    CardDetailsComponent,
    PasswordMeterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
