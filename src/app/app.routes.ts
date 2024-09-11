import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductComponent } from './components/product/product.component';
import { authGuard } from './core/auth.guard';
import { logedGuard } from './core/guards/loged.guard';
import { DetailsComponent } from './components/details/details.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';

export const routes: Routes = [
    {
        path: '', 
        component: AuthLayoutComponent, 
        canActivate: [logedGuard],
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'forgot', component: ForgotpasswordComponent }
        ]
    },
    {
        path: '', 
        component: BlankLayoutComponent, 
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'cart', component: CartComponent },
            { path: 'categories', component: CategoriesComponent },
            { path: 'product', component: ProductComponent },
            { path: 'details/:IdOfProudect', component: DetailsComponent },
            

        ]
    },
    { path: '**', component: NotfoundComponent } // Wildcard route for 404 page
];
