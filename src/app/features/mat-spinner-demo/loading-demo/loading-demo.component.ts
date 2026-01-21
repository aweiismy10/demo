import { LoadingService } from '../../../core/services/loading.service';
import { Component } from '@angular/core';
import { LoadingOverlayComponent } from '../../../shared/components/loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-loading-demo',
  imports: [LoadingOverlayComponent],
  templateUrl: './loading-demo.component.html',
  styleUrl: './loading-demo.component.scss'
})
export class LoadingDemoComponent {
  constructor(private loadingService:LoadingService){}

  getLoading() {
    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
    }, 3000);
  }

}
