import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'room/:room_id',
    loadChildren: () => import('./room/room.module').then( m => m.RoomPageModule)
  },
  {
    path: 'modal-start',
    loadChildren: () => import('./modals/modal-start/modal-start.module').then( m => m.ModalStartPageModule)
  },
  {
    path: 'modal-enter',
    loadChildren: () => import('./modals/modal-enter/modal-enter.module').then( m => m.ModalEnterPageModule)
  },
  {
    path: 'modal-information',
    loadChildren: () => import('./modals/modal-information/modal-information.module').then( m => m.ModalInformationPageModule)
  },
  {
    path: 'modal-facegame',
    loadChildren: () => import('./modals/modal-facegame/modal-facegame.module').then( m => m.ModalFacegamePageModule)
  },
  {
    path: 'facegame',
    loadChildren: () => import('./facegame/facegame.module').then( m => m.FacegamePageModule)
  },
  {
    path: 'modal-recommend',
    loadChildren: () => import('./modals/modal-recommend/modal-recommend.module').then( m => m.ModalRecommendPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
