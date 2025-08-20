import { HttpInterceptorFn } from '@angular/common/http';
import { inject} from '@angular/core';
import { AuthServiceService } from '../auth/auth-service.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthServiceService); // Injecte le service via inject()
  const authToken = authService.getToken();
  const router = inject(Router); 

  // Ajout du token à l'en-tête Authorization si disponible
  const authReq = authToken
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${authToken}` },
      })
    : req;

  return next(authReq).pipe(
    catchError((error) => {
      // Si le serveur retourne une erreur 401 (Unauthorized), déconnexion
      if (error.status === 401) {
        authService.logout(); // Déconnexion (ex. suppression du token)
        router.navigate(['/login']); // Redirection vers la page de connexion
      }
      return throwError(() => error); // Relancer l'erreur pour être traitée ailleurs si nécessaire
    })
  );
};
