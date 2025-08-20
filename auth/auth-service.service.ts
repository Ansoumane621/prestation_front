import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { environment } from '../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.getToken() !== null); // Sujet pour gérer l'état de connexion
  public isLoggedIn$ = this.isLoggedInSubject.asObservable(); // Observable pour écouter les changements




  constructor(private http: HttpClient, private router: Router,private route: ActivatedRoute) {
}

  /**
   * Méthode pour se connecter
   * @param credentials Les informations de connexion (email, mot de passe, etc.)
   */
  login(user: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}retraite/login`, user).pipe(
      tap((response: any) => {
        TokenService.setToken(response.token);
        localStorage.setItem('userInfo', JSON.stringify(response.user));
        this.isLoggedInSubject.next(true);
        this.router.navigate(['/dashbord']);
      }),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || 'Échec de la connexion.';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  logout(): void {
    const token = TokenService.getToken();
    if (token) {
      this.http.post(`${environment.apiUrl}retraite/logout`, {}, { headers: { Authorization: `Bearer ${token}` } }).subscribe(() => {
        TokenService.removeToken();
        this.isLoggedInSubject.next(false);
        this.router.navigate(['/login']);
      });
    }
  }

  getToken(): string | null {
    return TokenService.getToken();
  }

  getInfoUser(): string | null {
    return localStorage.getItem('userInfo');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
