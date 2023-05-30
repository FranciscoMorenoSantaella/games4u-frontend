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
import { AuthGuard } from './auth.guard';
import { AuthGuard2 } from './auth.guard2';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AuthAdminGuard } from './auth.admin.guard';
import { GeneratecodesComponent } from './pages/generatecodes/generatecodes.component';
import { AddbalanceComponent } from './pages/addbalance/addbalance.component';
import { PruebaComponent } from './pages/prueba/prueba.component';
import { PaymentComponent } from './pages/payment/payment.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path: 'pago', component: PaymentComponent },
  {path:'search',component:SearchComponent},
  {path:'signin', component:SigninComponent, canActivate: [AuthGuard]},
  {path:'signup', component:SignupComponent, canActivate: [AuthGuard]},
  {path:'perfil', component:ProfileComponent, canActivate:[AuthGuard2]},
  {path:'juego/:id', component:GameComponent},
  {path:'juegos', component:GameslistComponent},
  {path:'deseados', component:WishlistComponent, canActivate:[AuthGuard2]},
  {path:'biblioteca', component:LibraryComponent, canActivate:[AuthGuard2]},
  {path:'carro', component:ShoppingcartComponent, canActivate:[AuthGuard2]},
  {path:'publicar', component:UploadgameComponent, canActivate:[AuthGuard2]},
  {path:'estadisticas/:id', component:StadisticsComponent,canActivate:[AuthGuard2]},
  {path:'verificar',component:AdministracionComponent, canActivate:[AuthAdminGuard]},
  {path:'codigos',component:GeneratecodesComponent,canActivate:[AuthAdminGuard]},
  {path:'añadir-saldo',component:AddbalanceComponent},
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
