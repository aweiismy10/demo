import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core'; // 引入 inject

export const adminGuard: CanActivateFn = (route, state) => {
  // 透過 inject() 取得 Router 實體 (取代舊版的 constructor 注入)
  const router = inject(Router);

  // 這裡未來會換成：檢查 localStorage 裡有沒有 Token，或呼叫 AuthService
  const isMockLoggedIn = true; // 假設目前開發階段先設為 true

  if (isMockLoggedIn) {
    return true; // 允許放行進入後台
  } else {
    alert('請先登入管理員帳號！');
    router.navigate(['/']); // 踢回首頁
    return false;
  }
};
