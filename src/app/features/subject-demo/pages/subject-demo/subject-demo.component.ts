import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from '../../../../core/services/loading.service';

@Component({
  selector: 'app-subject-demo',
  imports: [RouterOutlet],
  templateUrl: './subject-demo.component.html',
  styleUrl: './subject-demo.component.scss'
})
export class SubjectDemoComponent {
  constructor(private loadingService: LoadingService) { }

  getInputData = '';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadingService.isloading3$.subscribe((res) => {
      console.log('loading3$:', res);
      this.getInputData = res;
    })
  }
}
