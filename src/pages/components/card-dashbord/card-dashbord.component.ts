import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-dashbord',
  imports: [],
  templateUrl: './card-dashbord.component.html',
  styleUrl: './card-dashbord.component.css'
})
export class CardDashbordComponent {

  @Input() titre:string = ""
  @Input() nombre:number =2

}
