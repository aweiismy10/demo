import { Component } from '@angular/core';
import { LoadingService } from '../@services/loading.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-thirteenth',
  imports: [RouterOutlet],
  templateUrl: './thirteenth.component.html',
  styleUrl: './thirteenth.component.scss'
})
export class ThirteenthComponent {
  constructor(private loadingService: LoadingService) { }

  getInputData = '';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadingService._loading3$.subscribe((res) => {
      console.log('loading3$:', res);
      this.getInputData = res;
    })
  }
}
