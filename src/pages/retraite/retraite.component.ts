
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RetraiteService } from '../../app/retraite.service';

@Component({
  selector: 'app-retraite',
  imports: [RouterModule],
  templateUrl: './retraite.component.html',
  styleUrl: './retraite.component.css'
})
export class RetraiteComponent implements OnInit{

  private service = inject(RetraiteService)

  ngOnInit() {
    
      
  }


}
