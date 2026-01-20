import { Routes } from '@angular/router';
import { MainViewComponent } from './main-view/main-view.component';
import { HtmlExerciseComponent } from './features/first/html-exercise.component';
import { SecondComponent } from './second/second.component';
import { ThirdComponent } from './third/third.component';
import { ForthComponent } from './forth/forth.component';
import { FifthComponent } from './fifth/fifth.component';
import { SixthComponent } from './sixth/sixth.component';
import { SeventhComponent } from './seventh/seventh.component';
import { SeventhFirstComponent } from './seventh-first/seventh-first.component';
import { SeventhSecondComponent } from './seventh-second/seventh-second.component';
import { SeventhThirdComponent } from './seventh-third/seventh-third.component';
import { SeventhForthComponent } from './seventh-forth/seventh-forth.component';
import { EighthComponent } from './eighth/eighth.component';
import { NinthComponent } from './ninth/ninth.component';
import { NinthMenuComponent } from './ninth-menu/ninth-menu.component';
import { NinthAddComponent } from './ninth-add/ninth-add.component';
import { NinthDisplayComponent } from './ninth-display/ninth-display.component';
import { NinthMarkComponent } from './ninth-mark/ninth-mark.component';
import { NinthDeleteComponent } from './ninth-delete/ninth-delete.component';
import { TenthComponent } from './tenth/tenth.component';
import { EleventhComponent } from './eleventh/eleventh.component';
import { TwelfthComponent } from './twelfth/twelfth.component';
import { TwelfthFirstComponent } from './twelfth-first/twelfth-first.component';
import { ThirteenthComponent } from './thirteenth/thirteenth.component';
import { ThirteenthFirstComponent } from './thirteenth-first/thirteenth-first.component';
import { ForteenthComponent } from './forteenth/forteenth.component';
import { FifteenthComponent } from './fifteenth/fifteenth.component';
import { SixteenthComponent } from './sixteenth/sixteenth.component';
import { SeventeenthComponent } from './seventeenth/seventeenth.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'main-view', component: MainViewComponent },
  { path: 'first', component: HtmlExerciseComponent },
  { path: 'second', component: SecondComponent },
  { path: 'third', component: ThirdComponent },
  { path: 'forth', component: ForthComponent },
  { path: 'fifth', component: FifthComponent },
  { path: 'sixth', component: SixthComponent },
  {
    path: 'seventh', component: SeventhComponent,
    children: [
      { path: '', redirectTo: 'seventh-first', pathMatch: 'full' },
      { path: 'seventh-first', component: SeventhFirstComponent },
      { path: 'seventh-second', component: SeventhSecondComponent },
      { path: 'seventh-third', component: SeventhThirdComponent },
      { path: 'seventh-forth', component: SeventhForthComponent },
    ]
  },
  { path: 'eighth', component: EighthComponent },
  {
    path: 'ninth', component: NinthComponent,
    children: [
      { path: '', redirectTo: 'ninth-menu', pathMatch: 'full' },
      { path: 'ninth-menu', component: NinthMenuComponent },
      { path: 'ninth-add', component: NinthAddComponent },
      { path: 'ninth-display', component: NinthDisplayComponent },
      { path: 'ninth-mark', component: NinthMarkComponent },
      { path: 'ninth-delete', component: NinthDeleteComponent },
    ]
  },
  { path: 'tenth', component: TenthComponent },
  { path: 'eleventh', component: EleventhComponent },
  { path: 'twelfth', component: TwelfthComponent },
  { path: 'twelfth-first', component: TwelfthFirstComponent },
  {
    path: 'thirteenth', component: ThirteenthComponent,
    children: [
      { path: '', redirectTo: 'thirteenth-first', pathMatch: 'full' },
      { path: 'thirteenth-first', component: ThirteenthFirstComponent },
    ]
  },
  { path: 'forteenth', component: ForteenthComponent },
  { path: 'fifteenth', component: FifteenthComponent },
  { path: 'sixteenth', component: SixteenthComponent},
  { path: 'seventeenth', component: SeventeenthComponent },
  { path: '', redirectTo: '/main-view', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
