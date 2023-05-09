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
import { ProfileComponent } from './pages/profile/profile.component';
import { ShoppingcartComponent } from './pages/shoppingcart/shoppingcart.component';
import { StadisticsComponent } from './pages/stadistics/stadistics.component';
import { AdministracionComponent } from './pages/administracion/administracion.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'search',component:SearchComponent},
  {path:'signin', component:SigninComponent},
  {path:'signup', component:SignupComponent},
  {path:'perfil', component:ProfileComponent},
  {path:'juego/:id', component:GameComponent},
  {path:'juegos', component:GameslistComponent},
  {path:'deseados', component:WishlistComponent},
  {path:'biblioteca', component:LibraryComponent},
  {path:'carro', component:ShoppingcartComponent},
  {path:'publicar', component:UploadgameComponent},
  {path:'estadisticas/:id', component:StadisticsComponent},
  {path:'administracion',component:AdministracionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
