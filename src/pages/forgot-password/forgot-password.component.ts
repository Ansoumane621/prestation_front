import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {


  forgotPasswordForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;

      // Simule l'envoi du lien
      console.log('Email de réinitialisation envoyé à:', email);
      this.successMessage = 'Un lien a été envoyé à votre adresse email.';
      this.errorMessage = '';
    } else {
      this.successMessage = '';
      this.errorMessage = 'Veuillez entrer une adresse email valide.';
    }
  }

}
