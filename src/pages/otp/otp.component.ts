import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-otp',
  imports: [CommonModule,RouterModule,ReactiveFormsModule,FormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {

  otp: string[] = ['', '', '', '', '', ''];
  otpDigits = Array(6).fill(0);
  errorMessage = '';

  onSubmit() {
    const code = this.otp.join('');
    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      this.errorMessage = 'Veuillez entrer un code à 6 chiffres valide.';
      return;
    }

    this.errorMessage = '';
    console.log('OTP soumis :', code);
    // TODO : envoyer le code au backend
  }

  autoFocusNext(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1 && index < 5) {
      const nextInput = document.querySelector(`input[name=otp${index + 1}]`) as HTMLInputElement;
      nextInput?.focus();
    }
  }

}
