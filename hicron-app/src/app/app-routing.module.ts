import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent, pathMatch: 'full', data: { backendUrl: 'http://localhost:8084/' } },
    { path: 'form/:user_id', component: FormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
