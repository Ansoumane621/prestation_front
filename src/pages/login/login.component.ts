import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../../auth/auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  errorMessage = '';
  isLoading = false;
  private toastr = inject(ToastrService);

  constructor(private fb: FormBuilder,private authservice: AuthServiceService) {
    this.loginForm = this.fb.group({
      user_identify: ['', [Validators.required]],
      user_password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {

    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authservice.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.showError('Succès', "connexion réçue");
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.showError('Erreur serveur', error);
          console.error('Erreur lors de la connexion :', error);
        },
      });
      // this.router.navigate(['/dashbord']);
    } else {
      // Marquez tous les champs comme touchés pour afficher les erreurs
      this.loginForm.markAllAsTouched();
    }
  }

    showSuccess(message: string) {
    this.toastr.success(message, 'Succès', {
      timeOut: 3000,
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true
    });
  }

  showError(title: string, message: string) {
    this.toastr.error(message, title, {
      timeOut: 5000,
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true
    });
  }

}
