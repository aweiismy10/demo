import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TopNavBarDemoComponent } from './layout/top-nav-bar-demo/top-nav-bar-demo.component';
import { DOCUMENT } from '@angular/common';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [TopNavBarDemoComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'wd-260108-page';

  //----------------26.01.22添加-----------------------------------
  private document = inject(DOCUMENT); // 注入DOCUMENT操作body

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      // 這裡抓到routes.ts定義的theme
      mergeMap(route => route.data)).subscribe(data => {
        const theme = data['theme'] || 'default-theme';
        this.document.body.className = theme; // 這裡把class覆蓋在body上
      });
  }
  //----------------------------------------------------------------
  // goTop() {
  //   window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  // }
}
