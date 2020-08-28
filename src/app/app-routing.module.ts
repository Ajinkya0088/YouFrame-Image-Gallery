import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {ReactiveFormsModule} from '@angular/forms';
import {environment} from "../environments/environment";

const routes: Routes = [
  {
    path: 'upload',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'upload',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'images',
    loadChildren: () => import('./images/images.module').then( m => m.ImagesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
