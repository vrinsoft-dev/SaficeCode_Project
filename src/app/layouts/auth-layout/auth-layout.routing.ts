import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { ForgotPasswordComponent } from '../../pages/forgot-password/forgot-password.component';
import { TermsAndconditionComponent } from '../../pages/terms-andcondition/terms-andcondition.component';

export const AuthLayoutRoutes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgotpassword', component: ForgotPasswordComponent },
    { path: 'TermsAndconditionComponent', component: TermsAndconditionComponent }

];
