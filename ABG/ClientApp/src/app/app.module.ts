import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';;
import { Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';;
import { RegisterComponent } from './components/register/register.component';
import { MembershipComponent } from './components/membership/membership.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { FriendComponent } from './components/friend/friend.component';
import { LoginComponent } from './components/login/login.component';;
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShoppingCartStatusComponent } from './components/shopping-cart-status/shopping-cart-status.component'
import { CartService } from './services/cart.service';
import {MatTabsModule} from '@angular/material/tabs';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { SharedService } from './services/shared.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonToggleModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTooltipModule, MatTreeModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import { FriendDetailsComponent } from './components/friend-details/friend-details.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { A11yModule } from '@angular/cdk/a11y';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MembershipDialog } from './components/dialog copy/membership-dialog';
import { GenreComponent } from './components/genre/genre.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    GameListComponent,
    GameDetailsComponent ,
    RegisterComponent,
    FriendComponent,
    ArchiveComponent,
    MembershipComponent,
    LoginComponent,
    ShoppingCartComponent,
    ShoppingCartStatusComponent,
    FriendDetailsComponent,
    DialogComponent, 
    MembershipDialog, 
    GenreComponent
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      MatTabsModule,
      MatToolbarModule,
      MatButtonModule,
      MatIconModule,
      BrowserAnimationsModule,
      MatInputModule,
      MatSelectModule,
      MatCardModule,
      MatDialogModule,
      RouterModule,
      NoopAnimationsModule,
      A11yModule,
      CdkStepperModule,
      CdkTableModule,
      CdkTreeModule,
      DragDropModule,
      MatAutocompleteModule,
      MatBadgeModule,
      MatBottomSheetModule,
      MatButtonToggleModule,
      MatCheckboxModule,
      MatChipsModule,
      MatStepperModule,
      MatDatepickerModule,
      MatDividerModule,
      MatExpansionModule,
      MatGridListModule,
      MatListModule,
      MatMenuModule,
      MatNativeDateModule,
      MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule
    ],
    providers: [SharedService, CartService],
    bootstrap: [AppComponent], 
    entryComponents: [DialogComponent]
})
export class AppModule { }

