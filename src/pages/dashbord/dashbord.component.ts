import { Component, inject, OnInit,ViewEncapsulation  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LayoutService } from '../services/layout.service';
import { ThemeService } from '../services/theme.service';


@Component({
  selector: 'app-dashbord',
  imports: [CommonModule,RouterOutlet,RouterModule],
  encapsulation: ViewEncapsulation.None, // 👈 ceci rend le style global
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent implements OnInit {
  sidebarOpen = false;

  constructor(private layoutService: LayoutService) {
    this.layoutService.sidebarOpen$.subscribe((open) => {
      this.sidebarOpen = open;
    });
  }
  private themeService = inject(ThemeService)

  toggle() {
    this.layoutService.toggleSidebar();
  }

   isDarkMode = false;

  toggleTheme() {
   this.themeService.toggleTheme()
  }

  ngOnInit() {
   this.themeService.applySavedTheme();
  }
  

}
