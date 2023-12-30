import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import { Usuario } from '@core/models/Usuario';
import { NotificationService } from '@shared/services/notification/notification.service';

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

  constructor(private registerService: RegisterService, private router: Router, private notification: NotificationService) { }

  /**
   * Inicia el proceso de registro de un nuevo usuario.
   */
  signUp() {
    const { name, email, password } = this.formSignUp.value;
    const usuario: Usuario = {
      nombre: name,
      correo: email,
      password: password
    };

    if (!this.validaPasswords()) {
      this.notification.showErrorNotification('Las contraseñas no coinciden. Por favor, verifica y vuelve a intentarlo.');
      return;
    }

    this.notification.showLoadNotification('Registrando usuario...');
    this.registerService.registerUser(usuario)
      .subscribe({
        next: () => {
          this.notification.showSuccessNotification('Usuario creado');
          this.router.navigate(['/', 'auth']);
        },
        error: (err) => {
          const content = err?.error?.content || 'Error no controlado';
          console.error('Ocurrió un error al registrar al nuevo usuario. Error: ', content);
          this.notification.showErrorNotification('Ocurrió un error al registrar al nuevo usuario');
        }
      });
  }

  /**
   * Válida las contraseñas ingresadas en el formulario de registro.
   * @returns {boolean} true si las condiciones son iguales, false si no lo son.
   */
  validaPasswords(): boolean {
    const { password, confirmPassword } = this.formSignUp.value;

    const arePasswordsEqual = (password === confirmPassword);

    return arePasswordsEqual;
  }
}
