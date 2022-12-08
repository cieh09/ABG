import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchiveComponent } from './components/archive/archive.component';
import { FriendComponent } from './components/friend/friend.component';
import { GameDetailsComponent } from './components/game-details/game-details.component'
import { GameListComponent } from './components/game-list/game-list.component'
import { LoginComponent } from './components/login/login.component';
import { MembershipComponent } from './components/membership/membership.component';
import { RegisterComponent } from './components/register/register.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

const routes: Routes = [
    {
        path: '',
        component: GameListComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: GameListComponent
            },

        ]
    },
    { path: 'details', component: GameDetailsComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'membership', component: MembershipComponent},
    { path: 'archive', component: ArchiveComponent},
    { path: 'login', component: LoginComponent},
    { path: 'friend', component: FriendComponent},
    { path: 'cart', component: ShoppingCartComponent}
];

@NgModule({
    imports: [
        RouterModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }

