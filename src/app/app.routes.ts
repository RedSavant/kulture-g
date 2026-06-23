import { Routes } from '@angular/router';
import { Welcome } from './route/welcome/welcome';
import { App } from './route/app/app';

export const routes: Routes = [
    {
        path: '',
        component: Welcome
    },
    {
        path: 'app',
        component: App
    }
];
