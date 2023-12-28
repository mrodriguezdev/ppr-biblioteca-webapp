import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '@shared/services/notification/notification.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
})
export class AuthPageComponent {

  formSignIn: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService, private router: Router, private notification: NotificationService) { }

  /**
   * Inicia el proceso de inicio de sesión.
   */
  signIn() {
    const { email, password } = this.formSignIn.value;
    this.notification.showLoadNotification('Iniciando sesión...');
    this.authService.sendCredentials(email, password)
      .subscribe({
        next: () => {
          this.notification.hideAlert();
          this.router.navigate(['/', 'home']);
        },
        error: (err) => {
          const content = err?.error?.content || 'Error no controlado';
          console.error('Ocurrió un error al intentar iniciar sesión. Error: ', content);
          this.notification.showErrorNotification('Ocurrió un error al intentar iniciar sesión');
        }
      });
  }
}
