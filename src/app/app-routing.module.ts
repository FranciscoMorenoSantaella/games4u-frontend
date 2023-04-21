import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LibraryComponent } from './pages/library/library.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { UploadgameComponent } from './pages/uploadgame/uploadgame.component';
import { GameslistComponent } from './pages/gameslist/gameslist.component';
import { SearchComponent } from './pages/search/search.component';
import { GameComponent } from './pages/game/game.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'juego/:name', component:GameComponent},
  {path:'search',component:SearchComponent},
  {path:'signin', component:SigninComponent},
  {path:'signup', component:SignupComponent},
  {path:'juegos', component:GameslistComponent},
  {path:'deseados', component:WishlistComponent},
  {path:'biblioteca', component:LibraryComponent},
  {path:'publicar', component:UploadgameComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
