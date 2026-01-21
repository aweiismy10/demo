import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../../core/services/loading.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading-overlay',
  imports: [MatProgressSpinnerModule,CommonModule],
  templateUrl: './loading-overlay.component.html',
  styleUrl: './loading-overlay.component.scss'
})
export class LoadingOverlayComponent {
  constructor(private loadingService: LoadingService) { }

  loading$!: Observable<boolean>;

  ngOnInit(): void {
    this.loading$ = this.loadingService.isloading$;
  }

}
