    // GENERAL
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// MATERIALS
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

//APP
import { AppComponent } from './app.component';

//COMPONENTS
import { TestPageComponent } from './pages/test-page/test-page.component';
import { TestListComponent } from './components/test-list/test-list.component';
import { TestPreviewComponent } from './components/test-preview/test-preview.component';
import { TestDetailsComponent } from './pages/test-details/test-details.component';
import { TestEditComponent } from './pages/test-edit/test-edit.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuestionPreviewComponent } from './components/question-preview/question-preview.component';
import { AnswerListComponent } from './components/answer-list/answer-list.component';
import { AnswerPreviewComponent } from './components/answer-preview/answer-preview.component';

// HELPERS
import { MyCheckboxComponent } from './components/helpers/my-checkbox/my-checkbox.component';
import { TimerComponent } from './components/timer/timer.component';

//SERVICES
import { TestService } from './services/test/test.service';
import { UtilService } from './services/util/util.service';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { LoginComponent } from './pages/login/login.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserPreviewComponent } from './components/user-preview/user-preview.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    //APP
    AppComponent,

    //COMPONENTS
    TestPageComponent,
    TestListComponent,
    TestPreviewComponent,
    TestDetailsComponent,
    TestEditComponent,
    QuestionListComponent,
    QuestionPreviewComponent,
    AnswerListComponent,
    AnswerPreviewComponent,
    MyCheckboxComponent,
    TimerComponent,
    MainNavComponent,
    MainHeaderComponent,
    LoginComponent,
    UserPageComponent,
    UserListComponent,
    UserPreviewComponent,
    UserDetailsComponent,
  ],
  imports: [
    // GENERAL
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    //MATETIALS
    MatTooltipModule,
    MatRadioModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatIconModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  //SERVICES
  providers: [TestService, UtilService],
  bootstrap: [AppComponent],
})
export class AppModule {}
