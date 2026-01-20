import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../@services/loading.service';

@Component({
  selector: 'app-forteenth',
  imports: [MatProgressSpinnerModule],
  templateUrl: './forteenth.component.html',
  styleUrl: './forteenth.component.scss'
})
export class ForteenthComponent {
  loading$ = false;
  constructor(private loadingService:LoadingService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadingService._loading$.subscribe(res => {
      this.loading$ = res;
    })

  }

  getLoading(){
    this.loadingService.show();
    setTimeout(()=>{
      this.loadingService.hide();
    },3000);
  }
}
