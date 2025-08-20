import { Component, Inject, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LayoutService } from '../services/layout.service';
import { ThemeService } from '../services/theme.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../../../auth/auth-service.service';
@Component({
  selector: 'app-dashbord',
  imports: [CommonModule, RouterOutlet, RouterModule],
  encapsulation: ViewEncapsulation.None, // 👈 ceci rend le style global
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css',
})
export class DashbordComponent implements OnInit {
  sidebarOpen = false;
  private authservice = inject(AuthServiceService)
  constructor(private layoutService: LayoutService) {
    this.layoutService.sidebarOpen$.subscribe((open) => {
      this.sidebarOpen = open;
    });
  }
  private themeService = inject(ThemeService);
  private toastr = inject(ToastrService);

  toggle() {
    this.layoutService.toggleSidebar();
  }

  isDarkMode = false;
  info:any

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  ngOnInit() {
    this.themeService.applySavedTheme();
    this.info = localStorage.getItem('userInfo')
    this.info = JSON.parse(this.info)
    
  }

  logout(): void {
    Swal.fire({
            title: 'AVERTISSEMENT',
            text: "Souhaitez-vous vous déconnecté ?",
            icon: 'question',
            showCancelButton: true,cancelButtonText:'NON',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OUI',
          }).then((result) => {
            if (result.isConfirmed) {
                  this.authservice.logout()
                }
              },
            );
   
  }

  //  showSuccess() {
  //   this.toastr.success('Opération réussie', 'Succès');
  // }
}
