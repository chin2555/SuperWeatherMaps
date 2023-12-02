const rainfall = {};
const cityWeatherData = {};
const cities = [
  {
    name: "臺北市",
    lat: "25.0376",
    lon: "121.5148",
    api: "http://127.0.0.1:3000/predictNorth"
  },
  {
    name: "新北市",
    lat: "25.1648",
    lon: "121.4489",
    api: "http://127.0.0.1:3000/predictNorth"
  },
  {
    name: "桃園市",
    lat: "25.0067",
    lon: "121.0474",
    api: "http://127.0.0.1:3000/predictNorth"
  },
  {
    name: "基隆市",
    lat: "25.1333",
    lon: "121.7404",
    api: "http://127.0.0.1:3000/predictNorth"
  },
  {
    name: "新竹市",
    lat: "24.7986",
    lon: "120.9869",
    api: "http://127.0.0.1:3000/predictNorth"
  },
  {
    name: "新竹縣",
    lat: "24.8278",
    lon: "121.0142",
    api: "http://127.0.0.1:3000/predictNorth"
  },
  {
    name: "苗栗縣",
    lat: "24.5269",
    lon: "120.8308",
    api: "http://127.0.0.1:3000/predictNorth"
  },
  {
    name: "臺中市",
    lat: "24.1457",
    lon: "120.6840",
    api: "http://127.0.0.1:3000/predictMiddle"
  },
  {
    name: "彰化縣",
    lat: "23.8738",
    lon: "120.5812",
    api: "http://127.0.0.1:3000/predictMiddle"
  },
  {
    name: "南投縣",
    lat: "23.8813",
    lon: "120.9080",
    api: "http://127.0.0.1:3000/predictMiddle"
  },
  {
    name: "雲林縣",
    lat: "23.7205",
    lon: "120.5411",
    api: "http://127.0.0.1:3000/predictMiddle"
  },
  {
    name: "嘉義市",
    lat: "23.4959",
    lon: "120.4329",
    api: "http://127.0.0.1:3000/predictMiddle"
  },
  {
    name: "嘉義縣",
    lat: "23.5517",
    lon: "120.4284",
    api: "http://127.0.0.1:3000/predictMiddle"
  },
  {
    name: "臺南市",
    lat: "22.9932",
    lon: "120.2047",
    api: "http://127.0.0.1:3000/predictSouth"
  },
  {
    name: "高雄市",
    lat: "22.5659",
    lon: "120.3157",
    api: "http://127.0.0.1:3000/predictSouth"
  },
  {
    name: "屏東縣",
    lat: "22.0038",
    lon: "120.7463",
    api: "http://127.0.0.1:3000/predictSouth"
  },
  {
    name: "宜蘭縣",
    lat: "24.7639",
    lon: "121.7565",
    api: "http://127.0.0.1:3000/predictEast"
  },
  {
    name: "花蓮縣",
    lat: "23.9751",
    lon: "121.6132",
    api: "http://127.0.0.1:3000/predictEast"
  },
  {
    name: "臺東縣",
    lat: "22.7522",
    lon: "121.1545",
    api: "http://127.0.0.1:3000/predictEast"
  },
  {
    name: "澎湖縣",
    lat: "23.5655",
    lon: "119.5630",
    api: "http://127.0.0.1:3000/predictIslands"
  },
  {
    name: "連江縣",
    lat: "26.1692",
    lon: "119.9234",
    api: "http://127.0.0.1:3000/predictIslands"
  },
  {
    name: "金門縣",
    lat: "24.4073",
    lon: "118.2892",
    api: "http://127.0.0.1:3000/predictIslands"
  },
];
async function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 23.6921806, lng: 120.4316371 },
    zoom: 7.5,
    disableDefaultUI: true,
  });

  const infoWindow = new google.maps.InfoWindow();
  const city = new google.maps.Data();
  city.loadGeoJson('https://raw.githubusercontent.com/chin2555/flood/main/taiwanCities.json');

  await fetchDataAndForecastRainfall();

  /*const rainfall = {
    "臺北市": [
      { date: '9/6', value: 300 },
      { date: '9/7', value: 3.6 },
      { date: '9/8', value: 2.2 },
      { date: '9/9', value: 40.3 },
      { date: '9/10', value: 0.2 },
      { date: '9/11', value: 0.2 }
    ],
    "桃園市": [
      { date: '9/6', value: 247.7 },
      { date: '9/7', value: 1.8 },
      { date: '9/8', value: 0.2 },
      { date: '9/9', value: 0.3 },
      { date: '9/10', value: 0.5 },
      { date: '9/11', value: 0.2 }
    ],
    "高雄市": [
      { date: '9/6', value: 30 },
      { date: '9/7', value: 2.5 },
      { date: '9/8', value: 220.2 },
      { date: '9/9', value: 10.3 },
      { date: '9/10', value: 0.1 },
      { date: '9/11', value: 0.2 }
    ],
    "嘉義市": [
      { date: '9/6', value: 30 },
      { date: '9/7', value: 2.5 },
      { date: '9/8', value: 20.2 },
      { date: '9/9', value: 10.3 },
      { date: '9/10', value: 0.1 },
      { date: '9/11', value: 0.2 }
    ],
    "嘉義縣": [
      { date: '9/6', value: 30 },
      { date: '9/7', value: 2.5 },
      { date: '9/8', value: 20.2 },
      { date: '9/9', value: 10.3 },
      { date: '9/10', value: 0.1 },
      { date: '9/11', value: 0.2 }
    ],
    "基隆市": [
      { date: '9/6', value: 30 },
      { date: '9/7', value: 2.5 },
      { date: '9/8', value: 22.2 },
      { date: '9/9', value: 10.3 },
      { date: '9/10', value: 0.1 },
      { date: '9/11', value: 0.2 }
    ],
    "宜蘭縣": [
      { date: '9/6', value: 30 },
      { date: '9/7', value: 2.5 },
      { date: '9/8', value: 22.2 },
      { date: '9/9', value: 10.3 },
      { date: '9/10', value: 0.1 },
      { date: '9/11', value: 0.2 }
    ],
    "屏東縣": [
      { date: '9/6', value: 30 },
      { date: '9/7', value: 2.5 },
      { date: '9/8', value: 229.2 },
      { date: '9/9', value: 10.3 },
      { date: '9/10', value: 0.1 },
      { date: '9/11', value: 0.2 }
    ],
    "彰化縣": [
      { date: '9/6', value: 30 },
      { date: '9/7', value: 2.5 },
      { date: '9/8', value: 2.2 },
      { date: '9/9', value: 10.3 },
      { date: '9/10', value: 0.1 },
      { date: '9/11', value: 0.2 }
    ],
    "新北市": [
      { date: '9/6', value: 30 },
      { date: '9/7', value: 2.5 },
      { date: '9/8', value: 20.2 },
      { date: '9/9', value: 10.3 },
      { date: '9/10', value: 0.1 },
      { date: '9/11', value: 0.2 }
    ],
    "新竹市": [
      { date: '9/6', value: 30 },
      { date: '9/7', value: 2.5 },
      { date: '9/8', value: 20.2 },
      { date: '9/9', value: 10.3 },
      { date: '9/10', value: 0.1 },
      { date: '9/11', value: 0.2 }
    ],
    "新竹縣": [
      { date: '9/6', value: 30 },
      { date: '9/7', value: 2.5 },
      { date: '9/8', value: 20.2 },
      { date: '9/9', value: 10.3 },
      { date: '9/10', value: 0.1 },
      { date: '9/11', value: 0.2 }
    ],
    "澎湖縣": [
      { date: '9/6', value: 30 },
      { date: '9/7', value: 2.5 },
      { date: '9/8', value: 20.2 },
      { date: '9/9', value: 10.3 },
      { date: '9/10', value: 0.1 },
      { date: '9/11', value: 0.2 }
    ],
    "臺中市": [
      { date: '9/6', value: 30 },
      { date: '9/7', value: 2.5 },
      { date: '9/8', value: 22.2 },
      { date: '9/9', value: 10.3 },
      { date: '9/10', value: 0.1 },
      { date: '9/11', value: 0.2 }
    ],
    "臺南市": [
      { date: '9/6', value: 30 },
      { date: '9/7', value: 2.5 },
      { date: '9/8', value: 120.2 },
      { date: '9/9', value: 10.3 },
      { date: '9/10', value: 0.1 },
      { date: '9/11', value: 0.2 }
    ],
    "臺東縣": [
      { date: '9/6', value: 30 },
      { date: '9/7', value: 2.5 },
      { date: '9/8', value: 20.2 },
      { date: '9/9', value: 10.3 },
      { date: '9/10', value: 0.1 },
      { date: '9/11', value: 0.2 }
    ],
    "花蓮縣": [
      { date: '9/6', value: 30 },
      { date: '9/7', value: 2.5 },
      { date: '9/8', value: 22.2 },
      { date: '9/9', value: 10.3 },
      { date: '9/10', value: 0.1 },
      { date: '9/11', value: 0.2 }
    ],
    "苗栗縣": [
      { date: '9/6', value: 30 },
      { date: '9/7', value: 2.5 },
      { date: '9/8', value: 20.2 },
      { date: '9/9', value: 10.3 },
      { date: '9/10', value: 0.1 },
      { date: '9/11', value: 0.2 }
    ],
    "連江縣": [
      { date: '9/6', value: 30 },
      { date: '9/7', value: 2.5 },
      { date: '9/8', value: 20.2 },
      { date: '9/9', value: 10.3 },
      { date: '9/10', value: 0.1 },
      { date: '9/11', value: 0.2 }
    ],
    "金門縣": [
      { date: '9/6', value: 30 },
      { date: '9/7', value: 2.5 },
      { date: '9/8', value: 20.2 },
      { date: '9/9', value: 10.3 },
      { date: '9/10', value: 0.1 },
      { date: '9/11', value: 0.2 }
    ],
    "雲林縣": [
      { date: '9/6', value: 30 },
      { date: '9/7', value: 2.5 },
      { date: '9/8', value: 22.2 },
      { date: '9/9', value: 10.3 },
      { date: '9/10', value: 0.1 },
      { date: '9/11', value: 0.2 }
    ],
    "南投縣": [
      { date: '9/6', value: 30 },
      { date: '9/7', value: 2.5 },
      { date: '9/8', value: 2.2 },
      { date: '9/9', value: 10.3 },
      { date: '9/10', value: 0.1 },
      { date: '9/11', value: 0.2 }
    ]
  };

  const cityWeatherData = {
    "南投縣": {
      weatherDates: [
        { date: '9/6', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/7', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/8', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/9', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/10', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/11', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 }
      ]
    },
    "高雄市": {
      weatherDates: [
        { date: '9/6', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/7', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/8', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/9', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/10', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/11', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 }
      ]
    },
    "桃園市": {
      weatherDates: [
        { date: '9/6', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/7', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/8', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/9', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/10', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/11', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 }
      ]
    },
    "臺北市": {
      weatherDates: [
        { date: '9/6', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/7', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/8', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/9', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/10', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/11', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 }
      ]
    },
    "嘉義市": {
      weatherDates: [
        { date: '9/6', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/7', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/8', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/9', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/10', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/11', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 }
      ]
    },
    "嘉義縣": {
      weatherDates: [
        { date: '9/6', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/7', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/8', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/9', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/10', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/11', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 }
      ]
    },
    "基隆市": {
      weatherDates: [
        { date: '9/6', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/7', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/8', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/9', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/10', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/11', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 }
      ]
    },
    "宜蘭縣": {
      weatherDates: [
        { date: '9/6', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/7', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/8', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/9', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/10', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/11', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 }
      ]
    },
    "屏東縣": {
      weatherDates: [
        { date: '9/6', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/7', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/8', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/9', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/10', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/11', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 }
      ]
    },
    "彰化縣": {
      weatherDates: [
        { date: '9/6', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/7', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/8', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/9', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/10', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/11', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 }
      ]
    },
    "新北市": {
      weatherDates: [
        { date: '9/6', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/7', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/8', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/9', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/10', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/11', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 }
      ]
    },
    "新竹市": {
      weatherDates: [
        { date: '9/6', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/7', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/8', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/9', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/10', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/11', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 }
      ]
    },
    "新竹縣": {
      weatherDates: [
        { date: '9/6', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/7', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/8', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/9', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/10', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/11', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 }
      ]
    },
    "澎湖縣": {
      weatherDates: [
        { date: '9/6', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/7', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/8', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/9', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/10', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/11', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 }
      ]
    },
    "臺中市": {
      weatherDates: [
        { date: '9/6', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/7', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/8', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/9', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/10', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/11', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 }
      ]
    },
    "臺南市": {
      weatherDates: [
        { date: '9/6', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/7', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/8', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/9', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/10', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/11', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 }
      ]
    },
    "臺東縣": {
      weatherDates: [
        { date: '9/6', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/7', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/8', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/9', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/10', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/11', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 }
      ]
    },
    "花蓮縣": {
      weatherDates: [
        { date: '9/6', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/7', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/8', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/9', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/10', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/11', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 }
      ]
    },
    "苗栗縣": {
      weatherDates: [
        { date: '9/6', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/7', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/8', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/9', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/10', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/11', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 }
      ]
    },
    "連江縣": {
      weatherDates: [
        { date: '9/6', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/7', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/8', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/9', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/10', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/11', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 }
      ]
    },
    "金門縣": {
      weatherDates: [
        { date: '9/6', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/7', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/8', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/9', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/10', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/11', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 }
      ]
    },
    "雲林縣": {
      weatherDates: [
        { date: '9/6', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/7', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/8', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/9', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/10', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 },
        { date: '9/11', icon: "03d", description: "多雲", temperature: 21.05, maxT: 21.35, minT: 11.31, cloud: 49, humidity: 40, uvi: 5.8, windSpeed: 2.76 }
      ]
    },
  }*/

  //淹水潛勢圖
  var taipei = new google.maps.Data();
  var changhua = new google.maps.Data();
  var chiayi = new google.maps.Data();
  var chiayi_county = new google.maps.Data();
  var hsinchu = new google.maps.Data();
  var hsinchu_county = new google.maps.Data();
  var hualien = new google.maps.Data();
  var kaohsiung = new google.maps.Data();
  var keelung = new google.maps.Data();
  var kinmen = new google.maps.Data();
  var lienchiang = new google.maps.Data();
  var miaoli = new google.maps.Data();
  var nantou = new google.maps.Data();
  var newTaipei = new google.maps.Data();
  var penghu = new google.maps.Data();
  var pingtung = new google.maps.Data();
  var taichung = new google.maps.Data();
  var taitung = new google.maps.Data();
  var taoyuan = new google.maps.Data();
  var yilan = new google.maps.Data();
  var yunlin = new google.maps.Data();
  var tainan = new google.maps.Data();
  taipei.loadGeoJson('https://raw.githubusercontent.com/chin2555/flood/main/taipei.geojson');
  changhua.loadGeoJson('https://raw.githubusercontent.com/chin2555/flood/main/changhua.geojson');
  chiayi.loadGeoJson('https://raw.githubusercontent.com/chin2555/flood/main/chiayi.geojson');
  chiayi_county.loadGeoJson('https://raw.githubusercontent.com/chin2555/flood/main/chiayi_county.geojson');
  hsinchu.loadGeoJson('https://raw.githubusercontent.com/chin2555/flood/main/hsinchu.geojson');
  hsinchu_county.loadGeoJson('https://raw.githubusercontent.com/chin2555/flood/main/hsinchu_county.geojson');
  hualien.loadGeoJson('https://raw.githubusercontent.com/chin2555/flood/main/hualien.geojson');
  kaohsiung.loadGeoJson('https://raw.githubusercontent.com/chin2555/flood/main/kaohsiung.geojson');
  keelung.loadGeoJson('https://raw.githubusercontent.com/chin2555/flood/main/keelung.geojson');
  kinmen.loadGeoJson('https://raw.githubusercontent.com/chin2555/flood/main/kinmen.geojson');
  lienchiang.loadGeoJson('https://raw.githubusercontent.com/chin2555/flood/main/lienchiang.geojson');
  miaoli.loadGeoJson('https://raw.githubusercontent.com/chin2555/flood/main/miaoli.geojson');
  nantou.loadGeoJson('https://raw.githubusercontent.com/chin2555/flood/main/nantou.geojson');
  newTaipei.loadGeoJson('https://raw.githubusercontent.com/chin2555/flood/main/newTaipei.geojson');
  penghu.loadGeoJson('https://raw.githubusercontent.com/chin2555/flood/main/penghu.geojson');
  pingtung.loadGeoJson('https://raw.githubusercontent.com/chin2555/flood/main/pingtung.geojson');
  taichung.loadGeoJson('https://raw.githubusercontent.com/chin2555/flood/main/taichung.geojson');
  taitung.loadGeoJson('https://raw.githubusercontent.com/chin2555/flood/main/taitung.geojson');
  taoyuan.loadGeoJson('https://raw.githubusercontent.com/chin2555/flood/main/taoyuan.geojson');
  yilan.loadGeoJson('https://raw.githubusercontent.com/chin2555/flood/main/yilan.geojson');
  yunlin.loadGeoJson('https://raw.githubusercontent.com/chin2555/flood/main/yunlin.geojson');
  tainan.loadGeoJson('https://raw.githubusercontent.com/chin2555/flood/main/tainan.geojson');

  let taipeiMarker, changhuaMarker, chiayiMarker, chiayi_countyMarker, hsinchuMarker, hsinchu_countyMarker, hualienMarker, kaohsiungMarker, keelungMarker, kinmenMarker, lienchiangMarker, miaoliMarker, nantouMarker, newTaipeiMarker, penghuMarker, pingtungMarker, taichungMarker, taitungMarker, taoyuanMarker, yilanMarker, yunlinMarker, tainanMarker;

  // 淹水潛勢圖層
  const floodLayers = [taipei, changhua, chiayi, chiayi_county, hsinchu, hsinchu_county, hualien, kaohsiung, keelung, kinmen, lienchiang, miaoli, nantou, newTaipei, penghu, pingtung, taichung, taitung, taoyuan, yilan, yunlin, tainan];

  taipeiMarker = new google.maps.Marker({
    map: null, // 在初始化時不加入地圖
    icon: 'css/caution.png'
  });

  // 在 taipei 圖層上設定 'addfeature' 監聽器
  taipei.addListener('addfeature', function (event) {
    const multiPolygon = event.feature.getGeometry();
    const center = getMultiPolygonCenter(multiPolygon);

    // 設定 Marker 位置
    taipeiMarker.setPosition(center);
  });

  changhuaMarker = new google.maps.Marker({
    map: null, // 在初始化時不加入地圖
    icon: 'css/caution.png'
  });

  // 在 changhua 圖層上設定 'addfeature' 監聽器
  changhua.addListener('addfeature', function (event) {
    const multiPolygon = event.feature.getGeometry();
    const center = getMultiPolygonCenter(multiPolygon);

    // 設定 Marker 位置
    changhuaMarker.setPosition(center);
  });

  chiayiMarker = new google.maps.Marker({
    map: null, // 在初始化時不加入地圖
    icon: 'css/caution.png'
  });

  // 在 chiayi 圖層上設定 'addfeature' 監聽器
  chiayi.addListener('addfeature', function (event) {
    const multiPolygon = event.feature.getGeometry();
    const center = getMultiPolygonCenter(multiPolygon);

    // 設定 Marker 位置
    chiayiMarker.setPosition(center);
  });

  chiayi_countyMarker = new google.maps.Marker({
    map: null, // 在初始化時不加入地圖
    icon: 'css/caution.png'
  });

  // 在 chiayi_county 圖層上設定 'addfeature' 監聽器
  chiayi_county.addListener('addfeature', function (event) {
    const multiPolygon = event.feature.getGeometry();
    const center = getMultiPolygonCenter(multiPolygon);

    // 設定 Marker 位置
    chiayi_countyMarker.setPosition(center);
  });

  hsinchuMarker = new google.maps.Marker({
    map: null, // 在初始化時不加入地圖
    icon: 'css/caution.png'
  });

  // 在 hsinchu 圖層上設定 'addfeature' 監聽器
  hsinchu.addListener('addfeature', function (event) {
    const multiPolygon = event.feature.getGeometry();
    const center = getMultiPolygonCenter(multiPolygon);

    // 設定 Marker 位置
    hsinchuMarker.setPosition(center);
  });

  hsinchu_countyMarker = new google.maps.Marker({
    map: null, // 在初始化時不加入地圖
    icon: 'css/caution.png'
  });

  // 在 hsinchu_county 圖層上設定 'addfeature' 監聽器
  hsinchu_county.addListener('addfeature', function (event) {
    const multiPolygon = event.feature.getGeometry();
    const center = getMultiPolygonCenter(multiPolygon);

    // 設定 Marker 位置
    hsinchu_countyMarker.setPosition(center);
  });

  hualienMarker = new google.maps.Marker({
    map: null, // 在初始化時不加入地圖
    icon: 'css/caution.png'
  });

  // 在 hualien 圖層上設定 'addfeature' 監聽器
  hualien.addListener('addfeature', function (event) {
    const multiPolygon = event.feature.getGeometry();
    const center = getMultiPolygonCenter(multiPolygon);

    // 設定 Marker 位置
    hualienMarker.setPosition(center);
  });

  kaohsiungMarker = new google.maps.Marker({
    map: null, // 在初始化時不加入地圖
    icon: 'css/caution.png'
  });

  // 在 kaohsiung 圖層上設定 'addfeature' 監聽器
  kaohsiung.addListener('addfeature', function (event) {
    const multiPolygon = event.feature.getGeometry();
    const center = getMultiPolygonCenter(multiPolygon);

    // 設定 Marker 位置
    kaohsiungMarker.setPosition(center);
  });

  keelungMarker = new google.maps.Marker({
    map: null, // 在初始化時不加入地圖
    icon: 'css/caution.png'
  });

  // 在 keelung 圖層上設定 'addfeature' 監聽器
  keelung.addListener('addfeature', function (event) {
    const multiPolygon = event.feature.getGeometry();
    const center = getMultiPolygonCenter(multiPolygon);

    // 設定 Marker 位置
    keelungMarker.setPosition(center);
  });

  kinmenMarker = new google.maps.Marker({
    map: null, // 在初始化時不加入地圖
    icon: 'css/caution.png'
  });

  // 在 kinmen 圖層上設定 'addfeature' 監聽器
  kinmen.addListener('addfeature', function (event) {
    const multiPolygon = event.feature.getGeometry();
    const center = getMultiPolygonCenter(multiPolygon);

    // 設定 Marker 位置
    kinmenMarker.setPosition(center);
  });

  lienchiangMarker = new google.maps.Marker({
    map: null, // 在初始化時不加入地圖
    icon: 'css/caution.png'
  });

  // 在 lienchiang 圖層上設定 'addfeature' 監聽器
  lienchiang.addListener('addfeature', function (event) {
    const multiPolygon = event.feature.getGeometry();
    const center = getMultiPolygonCenter(multiPolygon);

    // 設定 Marker 位置
    lienchiangMarker.setPosition(center);
  });

  miaoliMarker = new google.maps.Marker({
    map: null, // 在初始化時不加入地圖
    icon: 'css/caution.png'
  });

  // 在 miaoli 圖層上設定 'addfeature' 監聽器
  miaoli.addListener('addfeature', function (event) {
    const multiPolygon = event.feature.getGeometry();
    const center = getMultiPolygonCenter(multiPolygon);

    // 設定 Marker 位置
    miaoliMarker.setPosition(center);
  });

  nantouMarker = new google.maps.Marker({
    map: null, // 在初始化時不加入地圖
    icon: 'css/caution.png'
  });

  // 在 nantou 圖層上設定 'addfeature' 監聽器
  nantou.addListener('addfeature', function (event) {
    const multiPolygon = event.feature.getGeometry();
    const center = getMultiPolygonCenter(multiPolygon);

    // 設定 Marker 位置
    nantouMarker.setPosition(center);
  });

  newTaipeiMarker = new google.maps.Marker({
    map: null, // 在初始化時不加入地圖
    icon: 'css/caution.png'
  });

  // 在 newTaipei 圖層上設定 'addfeature' 監聽器
  newTaipei.addListener('addfeature', function (event) {
    const multiPolygon = event.feature.getGeometry();
    const center = getMultiPolygonCenter(multiPolygon);

    // 設定 Marker 位置
    newTaipeiMarker.setPosition(center);
  });

  penghuMarker = new google.maps.Marker({
    map: null, // 在初始化時不加入地圖
    icon: 'css/caution.png'
  });

  // 在 penghu 圖層上設定 'addfeature' 監聽器
  penghu.addListener('addfeature', function (event) {
    const multiPolygon = event.feature.getGeometry();
    const center = getMultiPolygonCenter(multiPolygon);

    // 設定 Marker 位置
    penghuMarker.setPosition(center);
  });

  pingtungMarker = new google.maps.Marker({
    map: null, // 在初始化時不加入地圖
    icon: 'css/caution.png'
  });

  // 在 pingtung 圖層上設定 'addfeature' 監聽器
  pingtung.addListener('addfeature', function (event) {
    const multiPolygon = event.feature.getGeometry();
    const center = getMultiPolygonCenter(multiPolygon);

    // 設定 Marker 位置
    pingtungMarker.setPosition(center);
  });

  taichungMarker = new google.maps.Marker({
    map: null, // 在初始化時不加入地圖
    icon: 'css/caution.png'
  });

  // 在 taichung 圖層上設定 'addfeature' 監聽器
  taichung.addListener('addfeature', function (event) {
    const multiPolygon = event.feature.getGeometry();
    const center = getMultiPolygonCenter(multiPolygon);

    // 設定 Marker 位置
    taichungMarker.setPosition(center);
  });

  taitungMarker = new google.maps.Marker({
    map: null, // 在初始化時不加入地圖
    icon: 'css/caution.png'
  });

  // 在 taitung 圖層上設定 'addfeature' 監聽器
  taitung.addListener('addfeature', function (event) {
    const multiPolygon = event.feature.getGeometry();
    const center = getMultiPolygonCenter(multiPolygon);

    // 設定 Marker 位置
    taitungMarker.setPosition(center);
  });

  taoyuanMarker = new google.maps.Marker({
    map: null, // 在初始化時不加入地圖
    icon: 'css/caution.png'
  });

  // 在 taoyuan 圖層上設定 'addfeature' 監聽器
  taoyuan.addListener('addfeature', function (event) {
    const multiPolygon = event.feature.getGeometry();
    const center = getMultiPolygonCenter(multiPolygon);

    // 設定 Marker 位置
    taoyuanMarker.setPosition(center);
  });

  yilanMarker = new google.maps.Marker({
    map: null, // 在初始化時不加入地圖
    icon: 'css/caution.png'
  });

  // 在 yilan 圖層上設定 'addfeature' 監聽器
  yilan.addListener('addfeature', function (event) {
    const multiPolygon = event.feature.getGeometry();
    const center = getMultiPolygonCenter(multiPolygon);

    // 設定 Marker 位置
    yilanMarker.setPosition(center);
  });

  yunlinMarker = new google.maps.Marker({
    map: null, // 在初始化時不加入地圖
    icon: 'css/caution.png'
  });

  // 在 yunlin 圖層上設定 'addfeature' 監聽器
  yunlin.addListener('addfeature', function (event) {
    const multiPolygon = event.feature.getGeometry();
    const center = getMultiPolygonCenter(multiPolygon);

    // 設定 Marker 位置
    yunlinMarker.setPosition(center);
  });

  tainanMarker = new google.maps.Marker({
    map: null, // 在初始化時不加入地圖
    icon: 'css/caution.png'
  });

  // 在 tainan 圖層上設定 'addfeature' 監聽器
  tainan.addListener('addfeature', function (event) {
    const multiPolygon = event.feature.getGeometry();
    const center = getMultiPolygonCenter(multiPolygon);

    // 設定 Marker 位置
    tainanMarker.setPosition(center);
  });

  const timeline = document.getElementById("timeline");

  const allDates = rainfall["臺北市"].map(entry => entry.date);
  console.log(allDates);

  // 設定初始選項
  let type = "temperature";

  // 初始化noUiSlider
  const slider = noUiSlider.create(timeline, {
    start: [0], // 初始值
    step: 1,
    range: {
      min: 0,
      max: allDates.length - 1,
    },
    tooltips: true, // 顯示值
    format: {
      to: (value) => {
        return allDates[value];
      },
      from: (value) => {
        return value;
      },
    },
  });

  slider.on("update", function (values, handle) {
    floodLayers.forEach(layer => {
      layer.setMap(null);
    });
    clearAllMarkers();
    selectedDate = values[handle];
    console.log(selectedDate);
    updateCityData(selectedDate, type);
  });

  var temperatureColor = document.getElementById("temperatureColor");
  var rainfallColor = document.getElementById("rainfallColor");
  var cloudColor = document.getElementById("cloudColor");
  var windColor = document.getElementById("windColor");
  var humidityColor = document.getElementById("humidityColor");
  var uviColor = document.getElementById("uviColor");
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(temperatureColor);

  const body = document.querySelector('body');
  const sidebar = body.querySelector('nav');
  const toggle = body.querySelector(".toggle");
  const searchBtn = body.querySelector(".search-box");

  const temperatureButton = document.getElementById("temperatureButton");
  const rainfallButton = document.getElementById("rainfallButton");
  const cloudButton = document.getElementById("cloudButton");
  const windButton = document.getElementById("windButton");
  const humidityButton = document.getElementById("humidityButton");
  const uviButton = document.getElementById("uviButton");

  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
  });

  //提示搜尋
  const inputText = document.getElementById("inputtext");
  const autocomplete = new google.maps.places.Autocomplete(inputText, {
    types: ['administrative_area_level_1'],
    componentRestrictions: { country: "tw" },
    fields: ["address_components"],
  });

  autocomplete.bindTo("bounds", map);

  searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
    console.log("search click");
    //console.log(inputText.value);
    if (inputText.value) {
      var result = geocode({ address: inputText.value })
        .then(result => {
          console.log(result);

          if (result.indexOf("台") != -1) {
            result = result.replace("台", "臺");
          }

          const weatherside = document.getElementById('weatherside');
          weatherside.style.display = "block";

          var temperatureData = parseFloat(cityWeatherData[result].weatherDates.find(entry => entry.date === selectedDate).temperature).toFixed(0);
          var maxTData = parseFloat(cityWeatherData[result].weatherDates.find(entry => entry.date === selectedDate).maxT).toFixed(0);
          var minTData = parseFloat(cityWeatherData[result].weatherDates.find(entry => entry.date === selectedDate).minT).toFixed(0);
          var rainfallData = rainfall[result].find(entry => entry.date === selectedDate).value;
          var cloudData = cityWeatherData[result].weatherDates.find(entry => entry.date === selectedDate).cloud;
          var windData = cityWeatherData[result].weatherDates.find(entry => entry.date === selectedDate).windSpeed;
          var humidityData = cityWeatherData[result].weatherDates.find(entry => entry.date === selectedDate).humidity;
          var uviData = cityWeatherData[result].weatherDates.find(entry => entry.date === selectedDate).uvi;
          var descriptionData = cityWeatherData[result].weatherDates.find(entry => entry.date === selectedDate).description;
          var iconData = cityWeatherData[result].weatherDates.find(entry => entry.date === selectedDate).icon;

          const city = document.getElementById('city');
          const date = document.getElementById('date');
          const temp = document.getElementById('temp');
          const maxminT = document.getElementById('maxminT');
          const rain = document.getElementById('rain');
          const cloud = document.getElementById('cloud');
          const wind = document.getElementById('wind');
          const hum = document.getElementById('hum');
          const uvi = document.getElementById('uvi');
          const des = document.getElementById('des');
          const icon = document.getElementById('icon');
          const iconURL = "https://openweathermap.org/img/wn/";

          city.textContent = result;
          date.textContent = selectedDate;
          temp.textContent = temperatureData + "°";
          maxminT.textContent = minTData + "°" + " / " + maxTData + "°";
          rain.textContent = rainfallData + " mm";
          cloud.textContent = cloudData + " %";
          wind.textContent = windData + " m/s";
          hum.textContent = humidityData + " %";
          uvi.textContent = uviData;
          des.textContent = descriptionData;
          icon.src = iconURL + iconData + "@4x.png";

          const close = document.getElementById('closeright');
          close.addEventListener('click', function (event) {
            weatherside.style.display = "none";
          });
        });
    }
  })

  rainfallButton.addEventListener("click", function () {
    if (type !== "rainfall") {
      type = "rainfall";
      updateCityData(selectedDate, type);
      map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].clear();
      if (rainfallColor) {
        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(rainfallColor);
      }
    }
  });

  temperatureButton.addEventListener("click", function () {
    if (type !== "temperature") {
      type = "temperature";
      floodLayers.forEach(layer => {
        layer.setMap(null);
      });
      clearAllMarkers();
      updateCityData(selectedDate, type);
      map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].clear();
      if (temperatureColor) {
        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(temperatureColor);
      }
    }
  });

  cloudButton.addEventListener("click", function () {
    if (type !== "cloud") {
      type = "cloud";
      floodLayers.forEach(layer => {
        layer.setMap(null);
      });
      clearAllMarkers();
      updateCityData(selectedDate, type);
      map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].clear();
      if (cloudColor) {
        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(cloudColor);
      }
    }
  });

  windButton.addEventListener("click", function () {
    if (type !== "wind") {
      type = "wind";
      floodLayers.forEach(layer => {
        layer.setMap(null);
      });
      clearAllMarkers();
      updateCityData(selectedDate, type);
      map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].clear();
      if (windColor) {
        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(windColor);
      }
    }
  });

  humidityButton.addEventListener("click", function () {
    if (type !== "humidity") {
      type = "humidity";
      floodLayers.forEach(layer => {
        layer.setMap(null);
      });
      clearAllMarkers();
      updateCityData(selectedDate, type);
      map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].clear();
      if (humidityColor) {
        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(humidityColor);
      }
    }
  });

  uviButton.addEventListener("click", function () {
    if (type !== "uvi") {
      type = "uvi";
      floodLayers.forEach(layer => {
        layer.setMap(null);
      });
      clearAllMarkers();
      updateCityData(selectedDate, type);
      map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].clear();
      if (uviColor) {
        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(uviColor);
      }
    }
  });

  // 更新縣市的顏色
  function updateCityData(selectedDate, type) {
    city.setStyle(function (feature) {
      var cityName = feature.getProperty('NAME_2014');
      let color;
      if (type === "rainfall") {
        if (rainfall && rainfall[cityName]) {
          var rainfallData = rainfall[cityName].find(entry => entry.date === selectedDate);
          if (rainfallData) {
            var rainfallValue = parseFloat(rainfallData.value);

            if (rainfallValue > 300) {
              color = "#EA80FC";
            } else if (rainfallValue > 200) {
              color = "#E040FB";
              switch (cityName) {
                case "臺北市":
                  taipeiMarker.setMap(map); // 加入 Marker 到地圖
                  taipei.setMap(map);
                  break;
                case "基隆市":
                  keelungMarker.setMap(map);
                  keelung.setMap(map);
                  break;
                case "新北市":
                  newTaipeiMarker.setMap(map);
                  newTaipei.setMap(map);
                  break;
                case "桃園市":
                  taoyuanMarker.setMap(map);
                  taoyuan.setMap(map);
                  break;
                case "新竹縣":
                  hsinchu_countyMarker.setMap(map);
                  hsinchu_county.setMap(map);
                  break;
                case "新竹市":
                  hsinchuMarker.setMap(map);
                  hsinchu.setMap(map);
                  break;
                case "苗栗縣":
                  miaoliMarker.setMap(map);
                  miaoli.setMap(map);
                  break;
                case "台中市":
                  taichungMarker.setMap(map);
                  taichung.setMap(map);
                  break;
                case "彰化縣":
                  changhuaMarker.setMap(map);
                  changhua.setMap(map);
                  break;
                case "南投縣":
                  nantouMarker.setMap(map);
                  nantou.setMap(map);
                  break;
                case "雲林縣":
                  yunlinMarker.setMap(map);
                  yunlin.setMap(map);
                  break;
                case "嘉義縣":
                  chiayi_countyMarker.setMap(map);
                  chiayi_county.setMap(map);
                  break;
                case "嘉義市":
                  chiayiMarker.setMap(map);
                  chiayi.setMap(map);
                  break;
                case "臺南市":
                  tainanMarker.setMap(map);
                  tainan.setMap(map);
                  break;
                case "高雄市":
                  kaohsiungMarker.setMap(map);
                  kaohsiung.setMap(map);
                  break;
                case "屏東縣":
                  pingtungMarker.setMap(map);
                  pingtung.setMap(map);
                  break;
                case "宜蘭縣":
                  yilanMarker.setMap(map);
                  yilan.setMap(map);
                  break;
                case "花蓮縣":
                  hualienMarker.setMap(map);
                  hualien.setMap(map);
                  break;
                case "台東縣":
                  taitungMarker.setMap(map);
                  taitung.setMap(map);
                  break;
                case "澎湖縣":
                  penghuMarker.setMap(map);
                  penghu.setMap(map);
                  break;
                case "金門縣":
                  kinmenMarker.setMap(map);
                  kinmen.setMap(map);
                  break;
                case "連江縣":
                  lienchiangMarker.setMap(map);
                  lienchiang.setMap(map);
                  break;
                default:
                  break;
              }
            } else if (rainfallValue > 150) {
              color = "#D500F9";
            } else if (rainfallValue > 130) {
              color = "#AA00FF";
            } else if (rainfallValue > 110) {
              color = "#D50000";
            } else if (rainfallValue > 90) {
              color = "#FF1744";
            } else if (rainfallValue > 70) {
              color = "#FF5252";
            } else if (rainfallValue > 50) {
              color = "#FFD600";
            } else if (rainfallValue > 40) {
              color = "#FFEA00";
            } else if (rainfallValue > 30) {
              color = "#FFFF00";
            } else if (rainfallValue > 20) {
              color = "#69F0AE";
            } else if (rainfallValue > 15) {
              color = "#00C853";
            } else if (rainfallValue > 10) {
              color = "#0091EA";
            } else if (rainfallValue > 6) {
              color = "#00B0FF";
            } else if (rainfallValue > 2) {
              color = "#40C4FF";
            } else if (rainfallValue > 1) {
              color = "#80D8FF";
            } else {
              color = "#BDBDBD";
            }
          }
        }
      } else if (type === "temperature") {
        var temperatureData = cityWeatherData[cityName].weatherDates.find(entry => entry.date === selectedDate);
        var temperatureValue = parseFloat(temperatureData.temperature);
        if (temperatureValue > 35) {
          color = "#FF5252";
        } else if (temperatureValue > 30) {
          color = "#FF6E40";
        } else if (temperatureValue > 25) {
          color = "#FFAB40";
        } else if (temperatureValue > 20) {
          color = "#FFFF8D";
        } else if (temperatureValue > 15) {
          color = "#69F0AE";
        } else if (temperatureValue > 10) {
          color = "#90CAF9";
        } else if (temperatureValue > 5) {
          color = "#448AFF";
        } else if (temperatureValue > 0) {
          color = "#2962FF";
        } else {
          color = "#304FFE";
        }
      } else if (type === "cloud") {
        var cloudData = cityWeatherData[cityName].weatherDates.find(entry => entry.date === selectedDate);
        var cloudValue = parseFloat(cloudData.cloud);
        if (cloudValue >= 90) {
          color = "#263238";
        } else if (cloudValue >= 80) {
          color = "#37474F";
        } else if (cloudValue >= 70) {
          color = "#455A64";
        } else if (cloudValue >= 60) {
          color = "#546E7A";
        } else if (cloudValue >= 50) {
          color = "#607D8B";
        } else if (cloudValue >= 40) {
          color = "#78909C";
        } else if (cloudValue >= 30) {
          color = "#90A4AE";
        } else if (cloudValue >= 20) {
          color = "#B0BEC5";
        } else if (cloudValue >= 10) {
          color = "#CFD8DC";
        } else {
          color = "#ECEFF1";
        }
      } else if (type === "wind") {
        var windData = cityWeatherData[cityName].weatherDates.find(entry => entry.date === selectedDate);
        var windValue = parseFloat(windData.windSpeed);
        if (windValue > 17.1) {
          color = "#FF7A7A";
        } else if (windValue > 13.8) {
          color = "#FFB27A";
        } else if (windValue > 10.7) {
          color = "#FFDA7A";
        } else if (windValue > 7.9) {
          color = "#FCFF7A";
        } else if (windValue > 5.4) {
          color = "#CDFF7A";
        } else if (windValue > 3.3) {
          color = "#95FF7A";
        } else if (windValue > 1.5) {
          color = "#85FEE9";
        } else if (windValue > 0.2) {
          color = "#B0FEFE";
        } else {
          color = "#E3FFFF";
        }
      } else if (type === "humidity") {
        var humidityData = cityWeatherData[cityName].weatherDates.find(entry => entry.date === selectedDate);
        var humidityValue = parseFloat(humidityData.humidity);
        if (humidityValue >= 90) {
          color = "#00112B";
        } else if (humidityValue >= 80) {
          color = "#002864";
        } else if (humidityValue >= 70) {
          color = "#0044AB";
        } else if (humidityValue >= 60) {
          color = "#0066FF";
        } else if (humidityValue >= 50) {
          color = "#267DFF";
        } else if (humidityValue >= 40) {
          color = "#4E95FF";
        } else if (humidityValue >= 30) {
          color = "#72AAFD";
        } else if (humidityValue >= 20) {
          color = "#9FC6FF";
        } else if (humidityValue >= 10) {
          color = "#C2DBFF";
        } else {
          color = "#F0F6FE";
        }
      } else if (type === "uvi") {
        var uviData = cityWeatherData[cityName].weatherDates.find(entry => entry.date === selectedDate);
        var uviValue = parseFloat(uviData.uvi);
        if (uviValue > 10) {
          color = "#7C4DFF";
        } else if (uviValue > 7) {
          color = "#FF5252";
        } else if (uviValue > 5) {
          color = "#FFAB40";
        } else if (uviValue > 2) {
          color = "#FFFF00";
        } else {
          color = "#B2FF59";
        }
      }

      return {
        fillColor: color,
        fillOpacity: 0.7,
        strokeWeight: 1,
        strokeOpacity: 0.5,
      };
    }
    );

    city.addListener('click', function (event) {
      console.log("click")
      const weatherside = document.getElementById('weatherside');
      weatherside.style.display = "block";

      var cityName = event.feature.getProperty('NAME_2014');
      var temperatureData = parseFloat(cityWeatherData[cityName].weatherDates.find(entry => entry.date === selectedDate).temperature).toFixed(0);
      var maxTData = parseFloat(cityWeatherData[cityName].weatherDates.find(entry => entry.date === selectedDate).maxT).toFixed(0);
      var minTData = parseFloat(cityWeatherData[cityName].weatherDates.find(entry => entry.date === selectedDate).minT).toFixed(0);
      var rainfallData = rainfall[cityName].find(entry => entry.date === selectedDate).value;
      var cloudData = cityWeatherData[cityName].weatherDates.find(entry => entry.date === selectedDate).cloud;
      var windData = cityWeatherData[cityName].weatherDates.find(entry => entry.date === selectedDate).windSpeed;
      var humidityData = cityWeatherData[cityName].weatherDates.find(entry => entry.date === selectedDate).humidity;
      var uviData = cityWeatherData[cityName].weatherDates.find(entry => entry.date === selectedDate).uvi;
      var descriptionData = cityWeatherData[cityName].weatherDates.find(entry => entry.date === selectedDate).description;
      var iconData = cityWeatherData[cityName].weatherDates.find(entry => entry.date === selectedDate).icon;

      const city = document.getElementById('city');
      const date = document.getElementById('date');
      const temp = document.getElementById('temp');
      const maxminT = document.getElementById('maxminT');
      const rain = document.getElementById('rain');
      const cloud = document.getElementById('cloud');
      const wind = document.getElementById('wind');
      const hum = document.getElementById('hum');
      const uvi = document.getElementById('uvi');
      const des = document.getElementById('des');
      const icon = document.getElementById('icon');
      const iconURL = "https://openweathermap.org/img/wn/";

      city.textContent = cityName;
      date.textContent = selectedDate;
      temp.textContent = temperatureData + "°";
      maxminT.textContent = minTData + "°" + " / " + maxTData + "°";
      rain.textContent = rainfallData + " mm";
      cloud.textContent = cloudData + " %";
      wind.textContent = windData + " m/s";
      hum.textContent = humidityData + " %";
      uvi.textContent = uviData;
      des.textContent = descriptionData;
      icon.src = iconURL + iconData + "@4x.png";

      const close = document.getElementById('closeright');
      close.addEventListener('click', function (event) {
        weatherside.style.display = "none";
      });
    });

    city.addListener('mouseover', function (event) {
      city.revertStyle();
      city.overrideStyle(event.feature, { strokeWeight: 5 });

      var cityName = event.feature.getProperty('NAME_2014');

      if (type === "rainfall") {
        if (rainfall && rainfall[cityName])
          var rainfallData = rainfall[cityName].find(entry => entry.date === selectedDate).value;
        var infoContent = '<div><strong>' + cityName + '</strong><br>降水量：' + rainfallData + ' mm</div>';
      }
      else if (type === "temperature") {
        var temperatureData = parseFloat(cityWeatherData[cityName].weatherDates.find(entry => entry.date === selectedDate).temperature).toFixed(0);
        var infoContent = '<div><strong>' + cityName + '</strong><br>溫度：' + temperatureData + ' °C</div>';
      }
      else if (type === "cloud") {
        var cloudData = cityWeatherData[cityName].weatherDates.find(entry => entry.date === selectedDate).cloud;
        var infoContent = '<div><strong>' + cityName + '</strong><br>雲量：' + cloudData + ' %</div>';
      }
      else if (type === "wind") {
        var wind = "";
        var windData = cityWeatherData[cityName].weatherDates.find(entry => entry.date === selectedDate).windSpeed;
        var windValue = parseFloat(windData);
        if (windValue > 17.1) {
          wind = ">8級";
        } else if (windValue > 13.8) {
          wind = "7級";
        } else if (windValue > 10.7) {
          wind = "6級";
        } else if (windValue > 7.9) {
          wind = "5級";
        } else if (windValue > 5.4) {
          wind = "4級";
        } else if (windValue > 3.3) {
          wind = "3級";
        } else if (windValue > 1.5) {
          wind = "2級";
        } else if (windValue > 0.2) {
          wind = "1級";
        } else {
          wind = "0級";
        }
        var infoContent = '<div><strong>' + cityName + '</strong><br>風速：' + windData + ' m/s (' + wind + ')</div>';
      }
      else if (type === "humidity") {
        var humidityData = cityWeatherData[cityName].weatherDates.find(entry => entry.date === selectedDate).humidity;
        var infoContent = '<div><strong>' + cityName + '</strong><br>濕度：' + humidityData + ' %</div>';
      }
      else if (type === "uvi") {
        var uviData = cityWeatherData[cityName].weatherDates.find(entry => entry.date === selectedDate).uvi;
        var infoContent = '<div><strong>' + cityName + '</strong><br>紫外線：' + uviData + '</div>';
      }
      infoWindow.setContent(infoContent);
      infoWindow.setPosition(event.latLng);
      infoWindow.open(map);
    });

    city.addListener('mouseout', function (event) {
      city.revertStyle();
      infoWindow.close();
    });
    city.setMap(map);
  }

  //時間軸位置
  map.controls[google.maps.ControlPosition.BOTTOM].push(timeline);

  // 選擇顯示或隱藏淹水潛勢圖
  /*const showFlood = document.getElementById("showFlood");
  const floodCheckbox = document.getElementById("floodLayer");
  map.controls[google.maps.ControlPosition.BOTTOM].push(showFlood);
  floodCheckbox.addEventListener("change", () => {
    if (floodCheckbox.checked) {
      console.log("check");
      floodLayers.forEach(layer => {
        layer.setStyle({ fillColor: 'blue', strokeWeight: 1 });
        layer.setMap(map);
        console.log(layer);
      });
    }
    else {
      console.log("uncheck");
      floodLayers.forEach(layer => {
        layer.setMap(null);
      });
    }
  });*/

  function geocode(address) {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(address, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          const longName = results[0].address_components[0].long_name;
          //console.log(longName);
          resolve(longName);
        } else {
          console.error("Geocode was not successful for the following reason: " + status);
          reject(status);
        }
      });
    });
  }

  // 取得 MultiPolygon 的中心點
  function getMultiPolygonCenter(multiPolygon) {
    const polygons = multiPolygon.getArray();
    const bounds = new google.maps.LatLngBounds();

    polygons.forEach(polygon => {
      const polygonBounds = new google.maps.LatLngBounds();
      const paths = polygon.getArray();

      paths.forEach(path => {
        path.getArray().forEach(latLng => {
          polygonBounds.extend(latLng);
        });
      });

      bounds.extend(polygonBounds.getCenter());
    });

    return bounds.getCenter();
  }

  // 清空所有 Marker
  function clearAllMarkers() {
    if (taipeiMarker)
      taipeiMarker.setMap(null);
    if (changhuaMarker)
      changhuaMarker.setMap(null);
    if (chiayiMarker)
      chiayiMarker.setMap(null);
    if (chiayi_countyMarker)
      chiayi_countyMarker.setMap(null);
    if (hsinchuMarker)
      hsinchuMarker.setMap(null);
    if (hsinchu_countyMarker)
      hsinchu_countyMarker.setMap(null);
    if (hualienMarker)
      hualienMarker.setMap(null);
    if (kaohsiungMarker)
      kaohsiungMarker.setMap(null);
    if (keelungMarker)
      keelungMarker.setMap(null);
    if (kinmenMarker)
      kinmenMarker.setMap(null);
    if (lienchiangMarker)
      lienchiangMarker.setMap(null);
    if (miaoliMarker)
      miaoliMarker.setMap(null);
    if (nantouMarker)
      nantouMarker.setMap(null);
    if (newTaipeiMarker)
      newTaipeiMarker.setMap(null);
    if (penghuMarker)
      penghuMarker.setMap(null);
    if (pingtungMarker)
      pingtungMarker.setMap(null);
    if (taichungMarker)
      taichungMarker.setMap(null);
    if (taitungMarker)
      taitungMarker.setMap(null);
    if (taoyuanMarker)
      taoyuanMarker.setMap(null);
    if (yilanMarker)
      yilanMarker.setMap(null);
    if (yunlinMarker)
      yunlinMarker.setMap(null);
    if (tainanMarker)
      tainanMarker.setMap(null);


  }


}

window.initMap = initMap;

function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
    .then(response => response.json()) // 輸出成 json
}

async function fetchDataAndForecastRainfall() {
  const apiKey = '80197f65ebc61432b6c91a1bdf72220e';

  // 使用 Promise.all 確保所有城市的數據都被成功獲取
  await Promise.all(cities.map(async (city) => {
    const apiUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat=' + city.lat + '&lon=' + city.lon + '&exclude=current,minutely,hourly&appid=' + apiKey + '&units=metric&lang=zh_tw';

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const forecastData = [];
      const date = [];
      const weatherDates = [];

      for (let i = 0; i < 6; i++) {
        const dayForecast = data.daily[i];
        const icon = dayForecast.weather[0].icon;
        const description = dayForecast.weather[0].description;
        const pressure = dayForecast.pressure;
        const temperature = dayForecast.temp.day;
        const maxTemperature = dayForecast.temp.max;
        const minTemperature = dayForecast.temp.min;
        const humidity = dayForecast.humidity;
        const windSpeed = dayForecast.wind_speed;
        const cloud = (dayForecast.clouds) / 10;
        const uvi = dayForecast.uvi;
        const timestamp = dayForecast.dt;

        const month = getMonthFromUnixTimestamp(timestamp);
        const day = getDayFromUnixTimestamp(timestamp);

        date.push(month + '/' + day);
        const weather = {
          "date": month + '/' + day,
          "temperature": temperature,
          "maxT": maxTemperature,
          "minT": minTemperature,
          "humidity": humidity,
          "windSpeed": windSpeed,
          "cloud": cloud * 10,
          "uvi": uvi,
          "icon": icon,
          "description": description
        }
        weatherDates.push(weather);

        const weatherData = {
          "氣壓": pressure,
          "最高溫度": maxTemperature,
          "最低溫度": minTemperature,
          "相對濕度": humidity,
          "風速": windSpeed,
          "雲量": cloud,
          "月份": month
        };

        forecastData.push(weatherData);
      }

      cityWeatherData[city.name] = {
        weatherDates
      };

      console.log(cityWeatherData);

      // forecastData 傳遞給 postData 函數進行 API 請求
      const results = await postData(city.api, forecastData);

      // 處理 API 回傳的結果
      const resultsWithDate = results.map((result, index) => {
        return {
          date: date[index],
          value: parseFloat(result.result).toFixed(2) // 保留到小數點第二位
        };
      });
      rainfall[city.name] = resultsWithDate;
      console.log(resultsWithDate);
    } catch (error) {
      console.error('Error fetching or processing weather data:', error);
    }
  })).then(() => {
    // 所有數據獲取和填充都完成後，這個區塊將運行
    console.log(rainfall); // 確保數據已經填充
  });
}

function getMonthFromUnixTimestamp(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  const month = date.getMonth() + 1; // 加 1 以得到正常的月份
  return month;
}

function getDayFromUnixTimestamp(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  const day = date.getDate();
  return day;
}
