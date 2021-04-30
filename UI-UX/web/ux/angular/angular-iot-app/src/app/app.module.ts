import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { AuthComponent } from './login/login.component';
import { AuthFormModule } from './login/auth-form/auth-form.module';
import { AccComponent } from './accounts/accounts.component';
import { AccountsService } from './core/services/accounts.service';
import { HttpClientModule } from '@angular/common/http';
import { TagModule } from './accounts/account/account.module';
import { AccFormComponent } from './accounts/acc-form/acc-form.component';
import { AppRoutingModule } from './app-routing.module';
import { CpButtonModule } from '@cpht/web-components'

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AccComponent,
    AccFormComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    // Here we import the module at the lowest root dir which allows us now to call our component anywhere within the projects app dir.
    TagModule,
    ReactiveFormsModule,
    AuthFormModule,
    CpButtonModule
  ],
  providers: [AccountsService],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
