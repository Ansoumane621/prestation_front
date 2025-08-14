import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-compte',
  imports: [CommonModule,ReactiveFormsModule,],
  templateUrl: './compte.component.html',
  styleUrl: './compte.component.css'
})
export class CompteComponent implements OnInit {

  activeTab = 'infos';
   // ... autres propriétés
  showAncien = false;
  showNouveau = false;
  showConfirmation = false;

  infosForm!: FormGroup;
  mdpForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Initialisation formulaire infos modifiables
    this.infosForm = this.fb.group({
      nom: ['Fatoumata Condé', Validators.required],
      email: ['fatoumata@example.com', [Validators.required, Validators.email]],
      telephone: ['+224 620 00 00 00', Validators.required],
      role: [{ value: 'Administrateur', disabled: true }], // rôle non modifiable
    });

    // Initialisation formulaire mot de passe
    this.mdpForm = this.fb.group(
      {
        ancien: ['', Validators.required],
        nouveau: ['', [Validators.required, Validators.minLength(6)]],
        confirmation: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const nouveau = form.get('nouveau')?.value;
    const confirmation = form.get('confirmation')?.value;
    return nouveau === confirmation ? null : { passwordMismatch: true };
  }

  saveInfos() {
    if (this.infosForm.invalid) {
      this.infosForm.markAllAsTouched();
      return;
    }

    // TODO: appel API pour sauvegarder les infos
    alert('✅ Informations mises à jour avec succès !');
  }

  changerMotDePasse() {
    if (this.mdpForm.invalid) {
      this.mdpForm.markAllAsTouched();
      return;
    }

    // TODO: appel API pour modifier mot de passe
    alert('✅ Mot de passe modifié avec succès !');
    this.mdpForm.reset();
  }
}
