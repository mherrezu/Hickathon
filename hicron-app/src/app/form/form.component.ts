import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  startDate: Date;
    endDate: Date;
    user_id: string = "-1";

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute
    ) {
        this.startDate = new Date();
        this.endDate = new Date();
        this.route.params.subscribe(params => {
            this.user_id = params['user_id'];
            console.log('user_id:', this.user_id);
        });
    }

  onSubmit() {
    // Aquí puedes manejar la lógica para enviar los datos del formulario al backend
    const formData = {
        startDate: this.startDate,
        endDate: this.endDate,
        user_id: this.user_id,
        approved: false
    };
    // Realiza las acciones necesarias, como enviar los datos al servidor
    this.http.post("http://localhost:8084/api/absences", formData).subscribe(
    response => {
      console.log('Respuesta del servidor:', response);
    },
    error => {
      console.error('Error al realizar la solicitud:', error);
    }
  );

    console.log(formData);
  }
}
