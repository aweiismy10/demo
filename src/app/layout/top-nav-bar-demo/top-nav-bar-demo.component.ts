import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavBarDataService } from '../../core/services/nav-bar-data.service';

@Component({
  selector: 'app-top-nav-bar-demo',
  imports: [RouterLink, RouterLinkActive],
  standalone: true,
  templateUrl: './top-nav-bar-demo.component.html',
  styleUrl: './top-nav-bar-demo.component.scss'
})
export class TopNavBarDemoComponent {
  constructor(private navbarService: NavBarDataService) { }

  navbar: any[] = [];

  ngOnInit(): void {
    // this.navbar = [...this.navbarService.navbar]
    this.navbar = this.navbarService.navbar.map(item => {
      return {
        name: item.label,
        link: item.link
      }
    });
  }
}
