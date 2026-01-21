export interface WeatherModel {
  cityId: number;
  city: string;
  dayparts: Array<{
    daypartsId: number;
    startTime: string;
    endTime: string;
    status: string;
    pop: string;
    minTemp: string;
    comfortIndex: string;
    maxTemp: string;
    weatherIcon: string;
  }>
}

export interface RawWeatherResponse {
  records: {
    datasetDescription: string; //"三十六小時天氣預報"
    location: Array<{ // 地點名稱陣列
      locationName: string; //地點名稱
      weatherElement: Array<{ // 氣象元素陣列
        elementName: string; // 元素名稱(「Wx天氣現象」、「PoP降雨機率」、「MinT最低溫度」、「CI舒適度」、「MaxT最高溫度」)
        time: Array<{ // 時間陣列
          startTime: string;// 預報開始時間
          endTime: string;// 預報結束時間
          parameter: { // 時間內發生的現象
            parameterName: string; // 參數名稱(全都有的欄位)
            parameterValue?: string;  // 不強制要求 ?晴時多雲的天氣現象代碼(Wx)
            parameterUnit?: string;   // 不強制要求 降雨機率(百分比:PoP) 溫度(C:MinT、MaxT)
          }
        }>
      }>
    }>
  }
}
