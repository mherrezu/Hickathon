import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(private http: HttpClient, private router: Router) {
    this.email = '';
    this.password = '';
  }


onSubmit() {
  const loginData = {
    email: this.email,
    password: this.password
  };

  this.http.post('http://localhost:8084/api/login', loginData).pipe(
    tap((response: any) => {
      // Aquí puedes manejar la respuesta del backend en caso de éxito
        console.log('Login successful:', response);
        const user_id = response.user.id
      // Realiza las acciones necesarias, como redirigir a otra página
      this.router.navigate([`/form/${user_id}`]);
    }),
    catchError((err: any) => {
      // Aquí puedes manejar la respuesta del backend en caso de error
      console.error('Login error:', err);
      // Realiza las acciones necesarias, como mostrar un mensaje de error
      return err;
    })
  ).subscribe((result: any) => {
    // Aquí puedes manejar el resultado final después de haber procesado la respuesta
    console.log('Result:', result);
  });
}

}
