import { Routes } from '@angular/router';
import { MainViewComponent } from './home/main-view/main-view.component';
import { HtmlExerciseComponent } from './features/html-exercise/html-exercise.component';
import { CssExerciseComponent } from './features/css-exercise/css-exercise.component';
import { ResumeExerciseComponent } from './features/resume-exercise/resume-exercise.component';
import { BindingExerciseComponent } from './features/binding-exercise/binding-exercise.component';
import { LevelCalculatorComponent } from './features/level-calculator/level-calculator.component';
import { BmiCalculatorComponent } from './features/bmi-calculator/bmi-calculator.component';
import { IoDemoComponent } from './features/io-demo/io-demo.component';
import { InputDemoPageComponent } from './features/io-demo/pages/input-demo-page/input-demo-page.component';
import { OutputDemoPageComponent } from './features/io-demo/pages/output-demo-page/output-demo-page.component';
import { ArrayDemoComponent } from './features/array-demo/array-demo.component';
import { TodoComponent } from './features/todo/todo.component';
import { ListAllComponent } from './features/todo/pages/list-all/list-all.component';
import { ListPendingComponent } from './features/todo/pages/list-pending/list-pending.component';
import { AddTodoComponent } from './features/todo/pages/add-todo/add-todo.component';
import { MarkDoneComponent } from './features/todo/pages/mark-done/mark-done.component';
import { DeleteTodoComponent } from './features/todo/pages/delete-todo/delete-todo.component';
import { WeatherComponent } from './features/weather/weather.component';
import { WeatherPageComponent } from './features/weather/pages/weather-page/weather-page.component';
import { MatTableDemoComponent } from './features/mat-table-demo/mat-table-demo.component';
import { MatDialogDemoComponent } from './features/mat-dialog-demo/pages/mat-dialog-demo/mat-dialog-democomponent';
import { SubjectDemoComponent } from './features/subject-demo/pages/subject-demo/subject-demo.component';
import { SubjectChildComponent } from './features/subject-demo/components/subject-child/subject-child.component';
import { LoadingDemoComponent } from './features/mat-spinner-demo/loading-demo/loading-demo.component';
import { MatDrawerDemoComponent } from './features/mat-drawer-demo/mat-drawer-demo.component';
import { MatToolbarDemoComponent } from './features/mat-toolbar-demo/mat-toolbar-demo.component';
import { MatRadioDemoComponent } from './features/mat-radio-demo/mat-radio-demo.component';
import { CheckboxDemoComponent } from './features/checkbox-demo/checkbox-demo.component';
import { QuestionnaireComponent } from './features/questionnaire/questionnaire.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { ListComponent } from './features/questionnaire/pages/frontend/list/list.component';
import { FillingComponent } from './features/questionnaire/pages/frontend/filling/filling.component';
import { ConfirmComponent } from './features/questionnaire/pages/frontend/confirm/confirm.component';
import { AdminListComponent } from './features/questionnaire/pages/admin/admin-list/admin-list.component';
import { AdminEditComponent } from './features/questionnaire/pages/admin/admin-edit/admin-edit.component';
import { StatisticsComponent } from './features/questionnaire/pages/frontend/statistics/statistics.component';

export const routes: Routes = [
  { path: 'main-view', component: MainViewComponent, data: { theme: 'theme-main' } },
  { path: '', redirectTo: '/main-view', pathMatch: 'full' }, // app.component.html預設導向此主頁
  { path: 'html-exercise', component: HtmlExerciseComponent, data: { theme: 'theme-indigo' } },
  { path: 'css-exercise', component: CssExerciseComponent, data: { theme: 'theme-tech' } },
  { path: 'resume-exercise', component: ResumeExerciseComponent, data: { theme: 'theme-skyblue' } },
  { path: 'binding-exercise', component: BindingExerciseComponent, data: { theme: 'theme-tech' } },
  { path: 'level-calculator', component: LevelCalculatorComponent, data: { theme: 'theme-indigo' } },
  { path: 'bmi-calculator', component: BmiCalculatorComponent, data: { theme: 'theme-tech' } },
  {
    path: 'io-demo', component: IoDemoComponent,
    children: [
      { path: '', redirectTo: 'input-demo-page', pathMatch: 'full' },
      { path: 'input-demo-page', component: InputDemoPageComponent, data: { theme: 'theme-ocean' } },
      { path: 'output-demo-page', component: OutputDemoPageComponent, data: { theme: 'theme-ocean' } },
    ]
  },
  { path: 'array-demo', component: ArrayDemoComponent, data: { theme: 'theme-ocean' } },
  {
    path: 'todo', component: TodoComponent,
    children: [
      { path: '', redirectTo: 'list-all', pathMatch: 'full' },
      { path: 'list-all', component: ListAllComponent, data: { theme: 'theme-indigo' } },
      { path: 'list-pending', component: ListPendingComponent, data: { theme: 'theme-indigo' } },
      { path: 'add-todo', component: AddTodoComponent, data: { theme: 'theme-indigo' } },
      { path: 'mark-done', component: MarkDoneComponent, data: { theme: 'theme-petalpink' } },
      { path: 'delete-todo', component: DeleteTodoComponent, data: { theme: 'theme-petalpink' } },
    ]
  },
  {
    path: 'weather', component: WeatherComponent,
    children: [
      { path: '', redirectTo: 'weather-page', pathMatch: 'full' },
      { path: 'weather-page', component: WeatherPageComponent, data: { theme: 'theme-tech' } }
    ]
  },
  { path: 'mat-table-demo', component: MatTableDemoComponent, data: { theme: 'theme-skyblue' } },
  { path: 'mat-dialog-demo', component: MatDialogDemoComponent, data: { theme: 'theme-skyblue' } },
  {
    path: 'subject-demo', component: SubjectDemoComponent,
    children: [
      { path: '', redirectTo: 'subject-child', pathMatch: 'full' },
      { path: 'subject-child', component: SubjectChildComponent, data: { theme: 'theme-skyblue' } },
    ]
  },
  { path: 'loading-demo', component: LoadingDemoComponent, data: { theme: 'theme-sunset' } },
  { path: 'mat-drawer-demo', component: MatDrawerDemoComponent, data: { theme: 'theme-sunset' } },
  { path: 'mat-toolbar-demo', component: MatToolbarDemoComponent, data: { theme: 'theme-sunset' } },
  { path: 'mat-radio-demo', component: MatRadioDemoComponent, data: { theme: 'theme-sunset' } },
  { path: 'checkbox-demo', component: CheckboxDemoComponent, data: { theme: 'theme-sunset' } },
  {
    path: 'questionnaire', component: QuestionnaireComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      // 前台路由
      { path: 'list', component: ListComponent, data: { theme: 'theme-sunset' } },
      { path: 'filling/:id', component: FillingComponent, data: { theme: 'theme-sunset' } },
      { path: 'confirm', component: ConfirmComponent, data: { theme: 'theme-sunset' } }, // 不帶 ID，因為資料在 Session 裡
      { path: 'statistics/:id', component: StatisticsComponent },
      // 後台路由
      { path: 'admin/list', component: AdminListComponent, data: { theme: 'theme-skyblue' }  },
      { path: 'admin/create', component: AdminEditComponent, data: { theme: 'theme-skyblue' }  }, // 新增
      { path: 'admin/edit/:id', component: AdminEditComponent, data: { theme: 'theme-skyblue' }  }, // 編輯
    ]
  },
  { path: '**', component: PageNotFoundComponent, data: { theme: 'theme-indigo' } }
];
