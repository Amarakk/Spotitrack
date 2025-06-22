import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainScreenComponent } from './pages/main-screen/main-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav'
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LoginScreenComponent } from './pages/login-screen/login-screen.component';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';
import { DetailsComponent } from '../shared/components/details/details.component';
import {NgApexchartsModule} from "ng-apexcharts";
import {MatLegacySliderModule as MatSliderModule} from '@angular/material/legacy-slider';

// Neste arquivo são importados os módulos e componentes que serão utilizados na aplicação.
// e todos os componentes e módulos que serão criados na aplicação devem ser declarados aqui

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    LoginScreenComponent,
    DetailsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    MatDialogModule,
    NgApexchartsModule,
    MatSliderModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
