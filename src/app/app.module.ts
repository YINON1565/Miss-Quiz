    // GENERAL
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

//google-chart
import { GoogleChartsModule } from 'angular-google-charts';

import {} from 'socket.io-client'

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
import {MatTreeModule} from '@angular/material/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';

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
import { SnackBarComponent } from './components/helpers/snack-bar/snack-bar.component';

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
import { TestScoreDetailsComponent } from './pages/test-score-details/test-score-details.component';
import { QuizChartComponent } from './components/charts/quiz-chart/quiz-chart.component';
import { StoperComponent } from './components/stoper/stoper.component';
import { AuthService } from './services/auth/auth.service';
import { StorageService } from './services/storage/storage.service';
import { UserService } from './services/user/user.service';
import { SocketService } from './services/socket/socket.service';
import { QuestionEditComponent } from './components/question-edit/question-edit.component';
import { AnswerEditComponent } from './components/answer-edit/answer-edit.component';
import { TestFilterComponent } from './components/filters/test-filter/test-filter.component';
import { UserFilterComponent } from './components/filters/user-filter/user-filter.component';
import { MockTestService } from './services/mock-test/mock-test.service';
import { TestTreeComponent } from './components/test-tree/test-tree.component';
import { TreeTestService } from './services/treeTest/tree-test.service';
import { CountChildrenComponent } from './components/count-children/count-children.component';
import { ShowTimeComponent } from './components/helpers/show-time/show-time.component';
import { LoadingComponent } from './components/helpers/loading/loading.component';
import { DialogComponent } from './components/helpers/dialog/dialog.component';
import { QuestionNavComponent } from './components/question-nav/question-nav.component';

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
    TestScoreDetailsComponent,
    QuizChartComponent,
    StoperComponent,
    QuestionEditComponent,
    AnswerEditComponent,
    TestFilterComponent,
    UserFilterComponent,
    TestTreeComponent,
    CountChildrenComponent,
    ShowTimeComponent,
    SnackBarComponent,
    DialogComponent,
    LoadingComponent,
    QuestionNavComponent,
  ],
  imports: [
    // GENERAL
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    //google-chart
    GoogleChartsModule,

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
    MatTreeModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatToolbarModule,

    //service worker
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  //SERVICES
  providers: [TestService, MockTestService, TreeTestService, UtilService, AuthService, StorageService, UserService, SocketService],
  bootstrap: [AppComponent],
})
export class AppModule {}
