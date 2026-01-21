import { Component } from '@angular/core';
// 自訂服務調用API
import { WeatherService } from '../../services/weather.service';
// 原始JSON，自訂格式JSON
import { RawWeatherResponse, WeatherModel } from '../../models/weather-model';
// 引入ngModel
import { FormsModule } from '@angular/forms';
// 格式化自訂日期
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-weather-page',
  imports: [FormsModule, DatePipe],
  templateUrl: './weather-page.component.html',
  styleUrl: './weather-page.component.scss'
})
export class WeatherPageComponent {
constructor(private weatherService: WeatherService) { }
  // 載入判斷
  isLoading: boolean = true;
  // 定義一個變數來存目前要看第幾個時段 (0, 1, 2)
  currentDayIndex: number = 0;

  // 天氣現象代碼分區
  weatherType = {
    isSunny: [1, 24],
    isSunnyCloudy: [2, 3, 25],
    isCloudy: [4, 5, 6, 7, 26, 27, 28],
    isRainy: [8, 9, 10, 11, 12, 13, 14, 19, 20, 29, 30, 31, 32, 38, 39],
    isThunderRainy: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
    isSnowing: [23, 37, 42]
  }

  // 搜尋
  inputData: string = '';
  inputPrompt: string = '請輸入縣市名稱';
  // 選單選擇
  selectData: any = '';
  selectPrompt: string = '--請選擇縣市--';


  // 宣告 網頁標題變數
  webHeader: string = '';
  // 宣告 WeatherModel 型別的陣列
  weatherList: WeatherModel[] = [];
  // 宣告 WeatherModel 型別的原始陣列
  orginalList: WeatherModel[] = [];

  ngOnInit(): void {
    // 預設載入中
    this.isLoading = true;
    // 調用 HttpService 的 getWeatherData() 方法取得 API 資料
    // subscribe() :RxJS 的方法，用來監聽資料流
    this.weatherService.getWeatherData().subscribe({
      // next: 當 API 成功返回資料時執行
      next: (data) => {
        this.isLoading = false;
        this.webHeader = data.records.datasetDescription;
        // Console 輸出原始 API 資料
        console.log('原始 API 資料:', data);
        // 將複雜的 API 資料轉換成我要的格式，存到 weatherList
        this.weatherList = this.transformData(data);
        // 複製一份原始資料作為備份
        this.orginalList = this.weatherList.map((item => item));
        // 列印轉換後的資料格式
        console.log('轉換後的資料:', this.weatherList);
      },

      // error: 當 API 調用失敗時執行
      error: (err) => {
        console.error('API Error:', err)
      },

      // complete: 當資料流結束時執行
      complete: () => {
        console.log('觀察完成');
      }
    });
  }



  private transformData(rawData: RawWeatherResponse): WeatherModel[] {
    // 從 API 返回的資料中提取「地點」陣列(區域變數:預計不修改)
    const locations = rawData.records.location;

    // 使用 map() 迴圈：對每個地點進行轉換，並返回一個新的陣列
    return locations.map((loc, index) => {
      // 取出該地點的「氣象元素陣列」
      const weatherElements = loc.weatherElement;

      // 使用 find() 在 weatherElements 陣列中尋找特定的氣象元素
      const wx = weatherElements.find(e => e.elementName == 'Wx');   // 天氣現象
      const pop = weatherElements.find(e => e.elementName == 'PoP');   // 降雨機率
      const minT = weatherElements.find(e => e.elementName == 'MinT'); // 最低溫度
      const ci = weatherElements.find(e => e.elementName == 'CI');  // 舒適度
      const maxT = weatherElements.find(e => e.elementName == 'MaxT'); // 最高溫度

      const statusValue = wx?.time[0].parameter.parameterValue || '0'; // 取得Wx裡的天氣代碼
      const weatherIcon = this.getWxValueIcon(wx?.time[0].parameter.parameterValue || '0'); // 把代碼轉換成Icon

      // 取出每個氣象元素的時間陣列(三個時段，每個時段屬性{開始,結束})
      const wxTime = wx?.time || [];
      const popTime = pop?.time || [];
      const minTTime = minT?.time || [];
      const ciTime = ci?.time || [];
      const maxTTime = maxT?.time || [];

      // 使用 map() 迴圈：把該縣市的三個時段包成JSON，返回新的陣列[{時段1},{時段2},{時段3}]
      const getDayparts = wxTime.map((timeStage, index) => {
        return {
          // key: value
          daypartsId: index, // 0,1,2
          startTime: timeStage.startTime, // 開始時間
          endTime: timeStage.endTime, // 結束時間
          // 從 wx 物件的第i筆時間資料中取得天氣現象名稱（如果沒有就用 'null'）
          status: wxTime[index].parameter.parameterName || 'null', //eg.晴時多雲
          // 從 pop 物件的第i筆時間資料中取得降雨機率（如果沒有就用 '0'）
          pop: popTime[index].parameter.parameterName || '0', //eg.0(%)
          // 從 minT 物件的第i筆時間資料中取得最低溫（如果沒有就用 '0'）
          minTemp: minTTime[index].parameter.parameterName || '0', //eg.18(C)
          // 從 ci 物件的第i筆時間資料中取得舒適度（如果沒有就用 'null'）
          comfortIndex: ciTime[index].parameter.parameterName || 'null', //eg.稍有寒意至舒適
          // 從 maxT 物件的第i筆時間資料中取得最高溫（如果沒有就用 '0'）
          maxTemp: maxTTime[index].parameter.parameterName || '0', //eg.25(C)
          // 從 wx 物件的第i筆資料中取得value，並轉換成icon (如果沒有就用 'null')
          weatherIcon: this.getWxValueIcon(timeStage.parameter.parameterValue || 'null')
        }
      });

      // 回傳一個新的物件，只包含 HTML 需要的欄位
      // 返回我要的資料格式物件 WeatherModel[]，必須不為null或undefined才會訪問屬性
      return {
        //key: value
        cityId: index,
        city: loc.locationName,  // 縣市名稱
        dayparts: getDayparts
      };
    });
  }

  // 天氣代碼轉換Icon
  private getWxValueIcon(statusValue: string): string {
    const code = parseInt(statusValue);

    if (this.weatherType.isSunny.includes(code)) {
      return "☀️";
    } else if (this.weatherType.isSunnyCloudy.includes(code)) {
      return "🌤️";
    } else if (this.weatherType.isCloudy.includes(code)) {
      return "☁️"
    } else if (this.weatherType.isRainy.includes(code)) {
      return "🌧️";
    } else if (this.weatherType.isThunderRainy.includes(code)) {
      return "⛈️";
    } else if (this.weatherType.isSnowing.includes(code)) {
      return "❄️";
    } else {
      return "☀️";
    }
  }

  // 當輸入框改變時觸發
  onInputChange(): void {
    // 使用者打字，清空下拉選單
    this.selectData = '';
  }

  // 當下拉選單改變時觸發
  onSelectChange(): void {
    // 使用者選擇，清空輸入框
    this.inputData = '';
  }

  // 按下按鈕觸發，清空搜尋
  resetFilter(): void {
    this.inputData = '';
    this.selectData = '';
  }

  // 檢查是否有要(依溫度)由高到低排序
  isSortByMaxTemp() {
    const index = this.currentDayIndex;
    // 依最高溫 (MaxT) 從大到小排
    this.weatherList.sort((a, b) => {
      // 比較最高溫 (轉成數字)
      const tempA = parseInt(a.dayparts[index].maxTemp);
      const tempB = parseInt(b.dayparts[index].maxTemp);
      return tempB - tempA; // B - A 代表降冪排序 (大到小)
    });
  }

  // 檢查是否有要(依溫度)由低到高排序
  isSortByMinTemp() {
    const index = this.currentDayIndex;
    // 依最低溫 (minT) 從小到大排
    this.weatherList.sort((a, b) => {
      // 比較最低溫 (轉成數字)
      const tempA = parseInt(a.dayparts[index].minTemp); //16
      const tempB = parseInt(b.dayparts[index].minTemp); //17
      return tempA - tempB; // A - B 代表升冪排序 (小到大)
    });
  }

  // 檢查是否有要(依降雨機率)由高到低排序
  isSortByPop() {
    const index = this.currentDayIndex;
    this.weatherList.sort((a, b) => {
      return parseInt(b.dayparts[index].pop) - parseInt(a.dayparts[index].pop);
    });
  }

  // 取得"任何篩選條件"的結果
  get filteredList(): WeatherModel[] {
    // 宣告存取篩選結果的變數
    let result = this.weatherList;

    if (this.inputData && this.inputData.trim() != '') {
      result = this.weatherList.filter(item => item.city.includes(this.inputData));
    } else if (this.selectData && this.selectData != null) {
      result = this.weatherList.filter(item => item.cityId === parseInt(this.selectData));
    }
    return result.map((item, index) => {
      return {
        cityId: index,
        city: item.city,
        dayparts: item.dayparts.filter(n => n.daypartsId === this.currentDayIndex)
      }; // 預設顯示"所有縣市"第一筆預測時間的資料
    });
  }

  // 重制回未排序狀態
  resetSort() {
    this.weatherList = this.orginalList.map(item => item);
    return this.weatherList;
  }

  // 選擇時段
  selectDay(index: number): void {
    this.currentDayIndex = index;

    if (this.weatherList.length > 0) {
      this.weatherList = this.orginalList.map(item => item);
    }
  }

  // 判斷降雨機率的分支，回傳選擇器class名稱
  getRainClass(pop: string): string {
    const p = parseInt(pop);
    if (p === 0) return 'rain-zero';
    if (p <= 50) return 'rain-low';
    return 'rain-high';
  }


}
