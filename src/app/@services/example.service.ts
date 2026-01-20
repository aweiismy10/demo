import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {
  userInfo: any = {
    userName: '',
    userEmail: '',
    userAddress: ''
  }
}
