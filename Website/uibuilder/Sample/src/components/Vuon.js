Vue.component('vuon-component', {
  template: `
  <div id="vuon-app">
    <header>
      <h1>Dashboard</h1>
      <nav>
        <ul>
          <li><a href="#" @click.prevent="navigateTo('vuon')" :class="{ active: activeTab === 'vuon' }">Vườn</a></li>
          <li><a href="#" @click.prevent="navigateTo('phanbon')" :class="{ active: activeTab === 'phanbon' }">Phân bón</a></li>
          <li><a href="#" @click.prevent="navigateTo('chucnang')" :class="{ active: activeTab === 'chucnang' }">Chức năng</a></li>
          <li><a href="#" @click.prevent="navigateTo('aboutus')" :class="{ active: activeTab === 'aboutus' }">Về chúng tôi</a></li>
        </ul>
      </nav>
      <button class="logout-button" @click="logout">
        <i class="fas fa-sign-out-alt"></i>
      </button>
    </header>
    <div class="vuon-container">
      <div class="vuon-card">
        <h2>Không khí</h2>
        <p>Nhiệt độ: {{ airTemperature }}°C – Độ ẩm: {{ airHumidity }}%</p>
        <div class="chart-container">
          <div class="humidity-chart">
            <canvas id="humidityChart"></canvas>
            <p>Độ ẩm</p>
            <div class="chart-value">{{ airHumidity }}%</div>
          </div>
          <div class="temperature-gauge">
            <canvas id="temperatureGauge"></canvas>
            <p>Nhiệt độ</p>
            <div class="chart-value">{{ airTemperature }}°C</div>
          </div>
        </div>
      </div>
      <div class="vuon-card">
        <h2>Đất</h2>
        <p>Nhiệt độ: {{ soilTemperature }}°C – Độ ẩm: {{ soilHumidity }}%</p>
        <div class="chart-container">
          <div class="humidity-chart">
            <canvas id="soilHumidityChart"></canvas>
            <p>Độ ẩm</p>
            <div class="chart-value">{{ soilHumidity }}%</div>
          </div>
          <div class="temperature-gauge">
            <canvas id="soilTemperatureGauge"></canvas>
            <p>Nhiệt độ</p>
            <div class="chart-value">{{ soilTemperature }}°C</div>
          </div>
        </div>
      </div>
      <div class="vuon-card">
        <div class="tempHumidity-air">
          <h2>Chuyển biến nhiệt độ/độ ẩm (Không khí)</h2>
          <canvas id="airTempHumidityChart"></canvas>
        </div>
        <div class="tempHumidity-soil">
          <h2>Chuyển biến nhiệt độ/độ ẩm (Đất)</h2>
          <canvas id="soilTempHumidityChart"></canvas>
        </div>
      </div>
      <div class="vuon-card">
        <div class="ph-container">
          <h2>pH</h2>
          <canvas id="phChart"></canvas>
        </div>
        <div class="npk-container">
          <h2>NPK</h2>
          <canvas id="npkChart"></canvas>
          <p>N: {{ npkData.N }} – P: {{ npkData.P }} – K: {{ npkData.K }}</p>
        </div>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      activeTab: 'vuon',
      airTemperature: 0,
      airHumidity: 0,
      soilTemperature: 0,
      soilHumidity: 0,
      phValue: 0,
      npkData: {
        N: 0,
        P: 0,
        K: 0
      },
      phData: [], // Store historical pH data
      phLabels: [], // Store labels for the pH chart
      npkDataHistory: [], // Store historical NPK data
      npkLabels: [], // Store labels for the NPK chart
      airTempHumidityData: [], // Store historical air temp/humidity data
      airTempHumidityLabels: [], // Store labels for the air temp/humidity chart
      soilTempHumidityData: [], // Store historical soil temp/humidity data
      soilTempHumidityLabels: [] // Store labels for the soil temp/humidity chart
    };
  },
  methods: {
    navigateTo(tab) {
      this.$root.currentComponent = tab + '-component';
      this.activeTab = tab;
    },
    logout() {
      this.$root.currentComponent = 'login-component';
    },
    generateRandomData() {
      this.airTemperature = (Math.random() * 50 + 1).toFixed(1); // Ensure positive values
      this.airHumidity = (Math.random() * 100 + 1).toFixed(1); // Ensure positive values
      this.soilTemperature = (Math.random() * 50 + 1).toFixed(1); // Ensure positive values
      this.soilHumidity = (Math.random() * 100 + 1).toFixed(1); // Ensure positive values
      this.phValue = (Math.random() * 14 + 1).toFixed(1); // Ensure positive values
      this.npkData.N = Math.floor(Math.random() * 100 + 1); // Ensure positive values
      this.npkData.P = Math.floor(Math.random() * 100 + 1); // Ensure positive values
      this.npkData.K = Math.floor(Math.random() * 100 + 1); // Ensure positive values

      const currentTime = new Date().toLocaleTimeString();
      if (this.phData.length >= 10) { // Keep only the last 10 data points
        this.phData.shift();
        this.phLabels.shift();
      }
      this.phData.push(this.phValue);
      this.phLabels.push(currentTime);

      if (this.npkDataHistory.length >= 10) { // Keep only the last 10 data points
        this.npkDataHistory.shift();
        this.npkLabels.shift();
      }
      this.npkDataHistory.push({ N: this.npkData.N, P: this.npkData.P, K: this.npkData.K });
      this.npkLabels.push(currentTime);

      if (this.airTempHumidityData.length >= 10) { // Keep only the last 10 data points
        this.airTempHumidityData.shift();
        this.airTempHumidityLabels.shift();
      }
      this.airTempHumidityData.push({ temperature: this.airTemperature, humidity: this.airHumidity });
      this.airTempHumidityLabels.push(currentTime);

      if (this.soilTempHumidityData.length >= 10) { // Keep only the last 10 data points
        this.soilTempHumidityData.shift();
        this.soilTempHumidityLabels.shift();
      }
      this.soilTempHumidityData.push({ temperature: this.soilTemperature, humidity: this.soilHumidity });
      this.soilTempHumidityLabels.push(currentTime);

      this.updateCharts();
    },
    renderCharts() {
      // Humidity Chart
      this.humidityChart = new Chart(document.getElementById('humidityChart'), {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [this.airHumidity, 100 - this.airHumidity],
            backgroundColor: ['#00aaff', '#e0e0e0']
          }]
        },
        options: {
          cutout: '85%',
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
          }
        }
      });

      // Temperature Gauge
      this.temperatureGauge = new Chart(document.getElementById('temperatureGauge'), {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [this.airTemperature, 100 - this.airTemperature],
            backgroundColor: ['#ff8800', '#e0e0e0']
          }]
        },
        options: {
          cutout: '85%',
          rotation: 1 * Math.PI,
          circumference: 1 * Math.PI,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
          }
        }
      });

      // Soil Humidity Chart
      this.soilHumidityChart = new Chart(document.getElementById('soilHumidityChart'), {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [this.soilHumidity, 100 - this.soilHumidity],
            backgroundColor: ['#00aaff', '#e0e0e0']
          }]
        },
        options: {
          cutout: '85%',
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
          }
        }
      });

      // Soil Temperature Gauge
      this.soilTemperatureGauge = new Chart(document.getElementById('soilTemperatureGauge'), {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [this.soilTemperature, 100 - this.soilTemperature],
            backgroundColor: ['#ff8800', '#e0e0e0']
          }]
        },
        options: {
          cutout: '85%',
          rotation: 1 * Math.PI,
          circumference: 1 * Math.PI,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
          }
        }
      });

      // pH Chart
      this.phChart = new Chart(document.getElementById('phChart'), {
        type: 'line',
        data: {
          labels: this.phLabels,
          datasets: [{
            label: 'pH',
            data: this.phData,
            borderColor: '#00aaff',
            fill: false,
            spanGaps: true // Ensure lines are connected
          }]
        },
        options: {
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
          },
          scales: {
            x: {
              display: true
            },
            y: {
              display: true,
              min: 0,
              max: 14 // Adjust the max value to match the pH scale
            }
          }
        }
      });

      // NPK Chart
      this.npkChart = new Chart(document.getElementById('npkChart'), {
        type: 'bar',
        data: {
          labels: this.npkLabels,
          datasets: [
            { label: 'N', data: this.npkDataHistory.map(data => data.N), backgroundColor: '#ff8800' },
            { label: 'P', data: this.npkDataHistory.map(data => data.P), backgroundColor: '#00aaff' },
            { label: 'K', data: this.npkDataHistory.map(data => data.K), backgroundColor: '#ffa500' }
          ]
        },
        options: {
          plugins: {
            legend: { display: true },
            tooltip: { enabled: true }
          },
          scales: {
            x: { display: true },
            y: { display: true, min: 0, max: 100 }
          }
        }
      });

      // Air Temp/Humidity Chart
      this.airTempHumidityChart = new Chart(document.getElementById('airTempHumidityChart'), {
        type: 'line',
        data: {
          labels: this.airTempHumidityLabels,
          datasets: [
            {
              label: 'Air Temperature',
              data: this.airTempHumidityData.map(data => data.temperature),
              borderColor: '#ff8800',
              fill: false,
              spanGaps: true // Ensure lines are connected
            },
            {
              label: 'Air Humidity',
              data: this.airTempHumidityData.map(data => data.humidity),
              borderColor: '#00aaff',
              fill: false,
              spanGaps: true // Ensure lines are connected
            }
          ]
        },
        options: {
          plugins: {
            legend: { display: true },
            tooltip: { enabled: true }
          },
          scales: {
            x: {
              display: true
            },
            y: {
              display: true,
              min: 0,
              max: 100 // Adjust the max value to match the data range
            }
          }
        }
      });

      // Soil Temp/Humidity Chart
      this.soilTempHumidityChart = new Chart(document.getElementById('soilTempHumidityChart'), {
        type: 'line',
        data: {
          labels: this.soilTempHumidityLabels,
          datasets: [
            {
              label: 'Soil Temperature',
              data: this.soilTempHumidityData.map(data => data.temperature),
              borderColor: '#ff8800',
              fill: false,
              spanGaps: true // Ensure lines are connected
            },
            {
              label: 'Soil Humidity',
              data: this.soilTempHumidityData.map(data => data.humidity),
              borderColor: '#00aaff',
              fill: false,
              spanGaps: true // Ensure lines are connected
            }
          ]
        },
        options: {
          plugins: {
            legend: { display: true },
            tooltip: { enabled: true }
          },
          scales: {
            x: {
              display: true
            },
            y: {
              display: true,
              min: 0,
              max: 100 
            }
          }
        }
      });
    },
    updateCharts() {
      this.humidityChart.data.datasets[0].data = [this.airHumidity, 100 - this.airHumidity];
      this.humidityChart.update();

      this.temperatureGauge.data.datasets[0].data = [this.airTemperature, 50 - this.airTemperature];
      this.temperatureGauge.update();

      this.soilHumidityChart.data.datasets[0].data = [this.soilHumidity, 100 - this.soilHumidity];
      this.soilHumidityChart.update();

      this.soilTemperatureGauge.data.datasets[0].data = [this.soilTemperature, 50 - this.soilTemperature];
      this.soilTemperatureGauge.update();

      // Update pH Chart
      this.phChart.data.labels = this.phLabels;
      this.phChart.data.datasets[0].data = this.phData;
      this.phChart.update();

      // Update NPK Chart
      this.npkChart.data.labels = this.npkLabels;
      this.npkChart.data.datasets[0].data = this.npkDataHistory.map(data => data.N);
      this.npkChart.data.datasets[1].data = this.npkDataHistory.map(data => data.P);
      this.npkChart.data.datasets[2].data = this.npkDataHistory.map(data => data.K);
      this.npkChart.update();

      // Update Air Temp/Humidity Chart
      this.airTempHumidityChart.data.labels = this.airTempHumidityLabels;
      this.airTempHumidityChart.data.datasets[0].data = this.airTempHumidityData.map(data => data.temperature);
      this.airTempHumidityChart.data.datasets[1].data = this.airTempHumidityData.map(data => data.humidity);
      this.airTempHumidityChart.update();

      // Update Soil Temp/Humidity Chart
      this.soilTempHumidityChart.data.labels = this.soilTempHumidityLabels;
      this.soilTempHumidityChart.data.datasets[0].data = this.soilTempHumidityData.map(data => data.temperature);
      this.soilTempHumidityChart.data.datasets[1].data = this.soilTempHumidityData.map(data => data.humidity);
      this.soilTempHumidityChart.update();
    }
  },
  mounted() {
    this.renderCharts();
    setInterval(this.generateRandomData, 5000); 
    // Dung ket noi MQTT
    uibuilder.start();
    uibuilder.onChange('msg', (msg) => {
      this.airTemperature = msg.payload.airTemperature;
      this.airHumidity = msg.payload.airHumidity;
      this.soilTemperature = msg.payload.soilTemperature;
      this.soilHumidity = msg.payload.soilHumidity;
      this.phValue = msg.payload.phValue;
      this.npkData.N = msg.payload.npkData.N;
      this.npkData.P = msg.payload.npkData.P;
      this.npkData.K = msg.payload.npkData.K;
      this.airTempHumidityData.push({ temperature: this.airTemperature, humidity: this.airHumidity });
      this.airTempHumidityLabels.push(new Date().toLocaleTimeString());
      this.soilTempHumidityData.push({ temperature: this.soilTemperature, humidity: this.soilHumidity });
      this.soilTempHumidityLabels.push(new Date().toLocaleTimeString());
      this.updateCharts();
    });
  }
});