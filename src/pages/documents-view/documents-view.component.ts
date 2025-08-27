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
import { Router, RouterModule } from '@angular/router';
import { RetraiteService } from '../../app/retraite.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-documents-view',
  imports: [FormsModule, ReactiveFormsModule, PipesComponent,RouterModule, CommonModule],
  templateUrl: './documents-view.component.html',
  styleUrl: './documents-view.component.css',
})
export class DocumentsViewComponent implements OnInit {
  form: FormGroup;
  accepted: boolean = false;
  private service = inject(RetraiteService);
  info:any
  loading = false;
  id:number = 0
  private toastr = inject(ToastrService);
  constructor(private fb: FormBuilder, private router: Router) {
    
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { phone: string; employe: string ,id:number};
     // Stocker les données dans des propriétés du composant
    if (state) {
      this.phone = state.phone;
      this.employe = state.employe;
      this.id= state.id;
    }
    this.form = this.fb.group({
      description: ['', Validators.required],
      conditions: [false],
    });
  }

  onSubmit() {
    this.router.navigate([`dashbord/liquidation`,this.id]);
  }
  documents = [];

  documentSelectionne: string | null = null;

  afficherDocument(url: string) {
    this.documentSelectionne = url;
  }
  onTransfer(){
    this.loading = true; // active le loader et bloque le bouton
    this.service.transferer_doc({phone:this.phone}).subscribe({
      next:(response:any)=>{
        this.loading = false; // désactive le loader
        console.log(response)
        this.showSuccess(response.message)
      },
      error:(error:any)=>{
        this.loading = false; // désactive aussi le loader même en cas d’erreur
        console.log(error)
        this.showError('Erreur Serveur',error.message)
      }
    })
  }

  demandesAffichees: any[] = [];
  page = 1;
  pageSize = 5;
  phone!: string;
  isLoading = true;
  loadingReject = false;
  employe: any;
  get totalPages(): number {
    return Math.ceil(this.documents.length / this.pageSize);
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  ngOnInit() {
    this.id= this.employe.employe.id
    this.info = localStorage.getItem('userInfo')
    this.info = JSON.parse(this.info)
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
    this.loadingReject = true; // bouton en mode chargement
    let data = {
      phone:this.phone,
      email:this.employe.email
    }
    
    this.service.rejette_demande(data).subscribe({
      next:(res:any)=>{
        this.showSuccess(res.message)
        console.log(res)
        this.loadingReject = false; // désactive le loader
      },
      error:(err:any)=>{
        this.showError('Erreur serveur', err.message);
        console.log(err)
        this.loadingReject = false; // désactive aussi en cas d’erreur
      }
    })
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
