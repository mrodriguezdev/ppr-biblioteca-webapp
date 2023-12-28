import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import { Usuario } from '@core/models/Usuario';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  formSignUp: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  constructor(private registerService : RegisterService, private router: Router) {}

  signUp() {
    const { name, email, password, confirmPassword } = this.formSignUp.value;
    const usuario : Usuario = {
      nombre: name, 
      correo: email, 
      password: password
    };

    this.registerService.registerUser(usuario)
      .subscribe({
        next: () => {
          this.router.navigate(['/', 'auth']);
        }, 
        error: (err) => {
          const { content } = err.error;
          console.error('Algo sucedió al registrar al nuevo usuario. Error: ', content);
        }
      });
  }
}
