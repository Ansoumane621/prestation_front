import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PipesComponent } from '../pipes/pipes.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RetraiteService } from '../../app/retraite.service';
import { AfterViewInit } from '@angular/core';
import { Modal } from 'flowbite';

@Component({
  selector: 'app-documents-view',
  imports: [FormsModule, ReactiveFormsModule, PipesComponent, CommonModule],
  templateUrl: './documents-view.component.html',
  styleUrl: './documents-view.component.css',
})
export class DocumentsViewComponent implements OnInit {
  form: FormGroup;
  accepted: boolean = false;
  private route = inject(ActivatedRoute);
  private service = inject(RetraiteService);
  
  constructor(private fb: FormBuilder, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { phone: string; email: string };
     // Stocker les données dans des propriétés du composant
    if (state) {
      this.phone = state.phone;
      this.email = state.email;
    }
    this.form = this.fb.group({
      description: ['', Validators.required],
      conditions: [false],
    });
  }

  onSubmit() {
    console.log('Texte soumis :', this.form.value.description);
    alert('Formulaire validé ✅');
  }
  documents = [];

  documentSelectionne: string | null = null;

  afficherDocument(url: string) {
    this.documentSelectionne = url;
  }

  demandesAffichees: any[] = [];
  page = 1;
  pageSize = 5;
  phone!: string;
  isLoading = true;
  email: string = '';
  get totalPages(): number {
    return Math.ceil(this.documents.length / this.pageSize);
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  ngOnInit() {
    // this.phone = this.route.snapshot.paramMap.get('phone')!;
    this.service.get_document_by_employe(this.phone).subscribe({
      next: (response: any) => {
        this.documents = response.files;
        this.changePage(1);
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }

  changePage(page: number) {
    this.page = page;
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.demandesAffichees = this.documents.slice(start, end);
  }

  annulerdemande() {
    let data = {
      phone:this.phone,
      email:this.email
    }
    
    this.service.rejette_demande(data).subscribe({
      next:(res:any)=>{
        console.log(res)
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }
}
