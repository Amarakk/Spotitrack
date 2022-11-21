import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainScreenComponent } from './pages/main-screen/main-screen.component';
import { LoginScreenComponent } from './pages/login-screen/login-screen.component';

const routes: Routes = [
  {
    path: '',
    component:LoginScreenComponent,
  },
  {
    path: 'main',
    component: MainScreenComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
