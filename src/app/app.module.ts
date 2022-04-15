import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { loginPageComponent } from './Customer/User_Login Page/login.page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from './material.module';
import { homeComponent } from './Home/home.component';
import { signupPageComponent } from './Customer/_singup-page/signup.page.component';
import { HttpClientModule } from '@angular/common/http';
import { UserDashboardComponent } from './Customer/user-dashboard/user-dashboard.component';
import { DialogComponent } from './Customer/dialog/dialog.component';
import { ProductService } from './_services/product.service';
import { NoticeService } from './_services/notification.service';
import { DatePipe } from '@angular/common';
import { AdminDashBoardComponent } from './ADMIN/Admin-Dash-Board/admin-dashboard.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { HotToastModule } from '@ngneat/hot-toast';
import { AppRoutingModule } from './routing.module';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { adminLoginPageComponent } from './ADMIN/admin_Login Page/admin.login.page.component';
import { UserService } from './_services/user.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AdminLayoutComponent } from './ADMIN/admin-layout/adminLayout.component';
import { LandinPageComponent } from './landin-page.component';

@NgModule({
  declarations: [
    AppComponent,
    loginPageComponent,
    homeComponent,
    signupPageComponent,
    UserDashboardComponent,
    DialogComponent,
    AdminDashBoardComponent,
    adminLoginPageComponent,
    AdminLayoutComponent,
    LandinPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialExampleModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    HotToastModule.forRoot(),
  ],
  providers: [
    ProductService,
    NoticeService,
    DatePipe,
    UserService,
    AngularFirestore,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
