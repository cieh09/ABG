import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameDetailsComponent } from './components/game-details/game-details.component'
import { GameListComponent } from './components/game-list/game-list.component'
import { RegisterComponent } from './components/register/register.component';

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
    { path: 'register', component: RegisterComponent}
];

@NgModule({
    imports: [
        RouterModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }

