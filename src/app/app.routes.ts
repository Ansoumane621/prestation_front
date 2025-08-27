import { Routes } from '@angular/router';
import { DashbordComponent } from '../pages/dashbord/dashbord.component';
import { AuthGuard } from '../../auth.guard';

export const routes: Routes = [
  // Route indépendante pour login
  {
    path: 'login',
    loadComponent: () =>
      import('../pages/login/login.component').then((m) => m.LoginComponent),
  },
   {
    path: 'forgot',
    loadComponent: () =>
      import('../pages/forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent),
  },
    {
    path: 'otp',
    loadComponent: () =>
      import('../pages/otp/otp.component').then((m) => m.OtpComponent),
  },
  // Routes internes avec layout DashbordComponent
  {
    path: 'dashbord',
    canActivate:[AuthGuard],
    component: DashbordComponent,
    children: [
      {
        path: 'content_dashbord',
        loadComponent: () =>
          import('../pages/content-dashbord/content-dashbord.component').then(
            (m) => m.ContentDashbordComponent
          ),
      },
      {
        path: 'compte',
        loadComponent: () =>
          import('../pages/compte/compte.component').then(
            (m) => m.CompteComponent
          ),
      },
      {
        path:'documents',
        loadComponent:()=>import('../pages/documents-view/documents-view.component')
        .then((m)=>m.DocumentsViewComponent)
      },
      {
        path:'liquidation/:id',
        loadComponent:()=>import('../pages/liquidation/liquidation')
        .then((m)=>m.Liquidation)
      },
      {
        path: 'retraite/:value',
        loadComponent: () =>
          import('../pages/retraite/retraite.component').then(
            (m) => m.RetraiteComponent
          ),
          
        children: [
          {
            path:'',
            loadComponent:()=>import('../pages/retraite/content/content.component')
            .then((m)=>m.ContentComponent)

          }
          ,
          {
            path: 'pdf',
            loadComponent: () =>
              import('../pages/pdf-view/pdf-view.component').then(
                (m) => m.PdfViewComponent
              ),
          },
        ],
      },
      {
        path: 'pto/:value',
        loadComponent: () =>
          import('../pages/pto/pto.component').then((m) => m.PtoComponent),
        children: [
          {
            path:'',
            loadComponent:()=>import('../pages/retraite/content/content.component')
            .then((m)=>m.ContentComponent)

          }
          ,
          {
            path: 'pdf',
            loadComponent: () =>
              import('../pages/pdf-view/pdf-view.component').then(
                (m) => m.PdfViewComponent
              ),
          },
        ],
      },
      {
        path: 'reversion/:value',
        loadComponent: () =>
          import('../pages/reversion/reversion.component').then(
            (m) => m.ReversionComponent
          ),
          children: [
          {
            path:'',
            loadComponent:()=>import('../pages/retraite/content/content.component')
            .then((m)=>m.ContentComponent)

          }
          ,
          {
            path: 'pdf',
            loadComponent: () =>
              import('../pages/pdf-view/pdf-view.component').then(
                (m) => m.PdfViewComponent
              ),
          },
        ],
      },
      {
        path: 'pi/:value',
        loadComponent: () =>
          import('../pages/pi/pi.component').then((m) => m.PiComponent),
        children: [
          {
            path:'',
            loadComponent:()=>import('../pages/retraite/content/content.component')
            .then((m)=>m.ContentComponent)

          }
          ,
          {
            path: 'pdf',
            loadComponent: () =>
              import('../pages/pdf-view/pdf-view.component').then(
                (m) => m.PdfViewComponent
              ),
          },
        ],
      },
      {
        path: '',
        redirectTo: 'content_dashbord',
        pathMatch: 'full',
      },
    ],
  },

  // Redirection racine
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
