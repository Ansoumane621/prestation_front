import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RetraiteService {

  private http = inject(HttpClient)

  get_retraite_type(retraite:string):any{
    return this.http.get(`${environment.apiUrl}retraite/all_retraite_by_type/${retraite}`)
    // return this.http.get(`${environment.apiUrl}dsi/all_employe_retraite`)
 }

  get_document_by_employe(phone_number:string):any{
    return this.http.get(`${environment.apiUrl}retraite/get_file_by_employe/${phone_number}`)
 }
rejette_demande(data:any):any{
    return this.http.post(`${environment.apiUrl}retraite/annuler_demande`,data)
 }

 

}
