import { Routes } from '@angular/router';
import { MainViewComponent } from './main-view/main-view.component';
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
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'main-view', component: MainViewComponent },
  { path: '', redirectTo: '/main-view', pathMatch: 'full' }, // app.component.html預設導向此主頁
  { path: 'html-exercise', component: HtmlExerciseComponent },
  { path: 'css-exercise', component: CssExerciseComponent },
  { path: 'resume-exercise', component: ResumeExerciseComponent },
  { path: 'binding-exercise', component: BindingExerciseComponent },
  { path: 'level-calculator', component: LevelCalculatorComponent },
  { path: 'bmi-calculator', component: BmiCalculatorComponent },
  {
    path: 'io-demo', component: IoDemoComponent,
    children: [
      { path: '', redirectTo: 'input-demo-page', pathMatch: 'full' },
      { path: 'input-demo-page', component: InputDemoPageComponent },
      { path: 'output-demo-page', component: OutputDemoPageComponent },
    ]
  },
  { path: 'array-demo', component: ArrayDemoComponent },
  {
    path: 'todo', component: TodoComponent,
    children: [
      { path: '', redirectTo: 'list-all', pathMatch: 'full' },
      { path: 'list-all', component: ListAllComponent },
      { path: 'list-pending', component: ListPendingComponent },
      { path: 'add-todo', component: AddTodoComponent },
      { path: 'mark-done', component: MarkDoneComponent },
      { path: 'delete-todo', component: DeleteTodoComponent },
    ]
  },
  { path: 'weather', component: WeatherComponent,
    children: [
      { path: '', redirectTo: 'weather-page', pathMatch: 'full'},
      { path: 'weather-page', component: WeatherPageComponent}
    ]
  },
  { path: 'mat-table-demo', component: MatTableDemoComponent },
  { path: 'mat-dialog-demo', component: MatDialogDemoComponent },
  {
    path: 'subject-demo', component: SubjectDemoComponent,
    children: [
      { path: '', redirectTo: 'subject-child', pathMatch: 'full' },
      { path: 'subject-child', component: SubjectChildComponent },
    ]
  },
  { path: 'loading-demo', component: LoadingDemoComponent },
  { path: 'mat-drawer-demo', component: MatDrawerDemoComponent },
  { path: 'mat-toolbar-demo', component: MatToolbarDemoComponent},
  { path: 'mat-radio-demo', component: MatRadioDemoComponent },
  { path: 'checkbox-demo', component: CheckboxDemoComponent },
  { path: '**', component: PageNotFoundComponent }
];
