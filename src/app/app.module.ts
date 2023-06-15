import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { LibraryComponent } from './pages/library/library.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { FooterComponent } from './pages/footer/footer.component';
import { ContactComponent } from './pages/contact/contact.component';
import { UploadgameComponent } from './pages/uploadgame/uploadgame.component';
import { GameslistComponent } from './pages/gameslist/gameslist.component';
import { SearchComponent } from './pages/search/search.component';
import { GameComponent } from './pages/game/game.component';
import { AngularFireModule} from '@angular/fire/compat'
import { environment } from 'src/enviroments/enviroment.prod';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthGuard } from '../app/auth.guard';
import { StarRatingModule } from 'angular-star-rating';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatButtonModule} from '@angular/material/button';
import { ProfileComponent } from './pages/profile/profile.component';
import { ShoppingcartComponent } from './pages/shoppingcart/shoppingcart.component';
import { StadisticsComponent } from './pages/stadistics/stadistics.component';
import { AdministracionComponent } from './pages/administracion/administracion.component';
import { LoadingComponent } from './pages/loading/loading.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AddbalanceComponent } from './pages/addbalance/addbalance.component';
import { GeneratecodesComponent } from './pages/generatecodes/generatecodes.component';
import { RatingComponent } from './pages/rating/rating.component';
import { PruebaComponent } from './pages/prueba/prueba.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { MatSelectModule } from '@angular/material/select';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SignupComponent,
    SigninComponent,
    LibraryComponent,
    WishlistComponent,
    FooterComponent,
    ContactComponent,
    UploadgameComponent,
    GameslistComponent,
    SearchComponent,
    GameComponent,
    ProfileComponent,
    ShoppingcartComponent,
    StadisticsComponent,
    AdministracionComponent,
    LoadingComponent,
    NotfoundComponent,
    AddbalanceComponent,
    GeneratecodesComponent,
    RatingComponent,
    PruebaComponent,
    PaymentComponent,

  ],
  imports: [
    BrowserModule,
    StarRatingModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  providers: [AuthGuard, { provide: LOCALE_ID, useValue: 'en' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
