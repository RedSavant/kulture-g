import { Routes } from '@angular/router';
import { Welcome } from './route/welcome/welcome';
import { App } from './route/app/app';
import { Presentation } from './route/presentation/presentation';

export const routes: Routes = [
    {
        path: '',
        component: Welcome
    },
    {
        path: 'app',
        component: App
    },
    {
        path: 'presentation',
        component: Presentation
    }
];
