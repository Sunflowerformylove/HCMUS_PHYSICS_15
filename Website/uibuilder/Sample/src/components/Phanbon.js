Vue.component('phanbon-component', {
    template: `
    <div id="phanbon-app">
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
    <div class="phanbon-container">
      <div class="phanbon-card">
        <h2>Nhiệt độ: {{ airTemperature }}°C – Độ ẩm: {{ airHumidity }}%</h2>
        <div class="chart-container">
          <div class="humidity-chart">
            <p>Độ ẩm</p>
            <canvas id="humidityChart"></canvas>
            <div class="chart-value">{{ airHumidity }}%</div>
          </div>
          <div class="temperature-gauge">
            <p>Nhiệt độ</p>
            <canvas id="temperatureGauge"></canvas>
            <div class="chart-value">{{ airTemperature }}°C</div>
          </div>
        </div>
      </div>
      <div class="phanbon-card">
        <div class="temperature-container">
          <h2>Chuyển biến nhiệt độ/độ ẩm</h2>
          <canvas id="tempHumidityChart"></canvas>
        </div>
        <div class="gas-chart">
          <h2>Khí gas: {{ gasValue }} units</h2>
          <canvas id="gasChart"></canvas>
        </div>
      </div>
      <div class="phanbon-card">
        <h2>Lượng nước còn lại: {{ waterLevel }}%</h2>
        <h2>Lượng rác trong thùng: {{ trashLevel }}%</h2>
        <h2>Khối lượng rác: {{ trashWeight }} kg</h2>
      </div>
    </div>
  </div>
    `,
    data() {
      return {
        activeTab: 'phanbon',
        airTemperature: 0,
        airHumidity: 0,
        gasValue: 0,
        waterLevel: 0,
        trashLevel: 0,
        trashWeight: 0,
        tempHumidityData: [], 
        tempHumidityLabels: [] 
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
        this.airTemperature = (Math.random() * 50 + 1).toFixed(1);
        this.airHumidity = (Math.random() * 100 + 1).toFixed(1);
        this.gasValue = Math.floor(Math.random() * 100 + 1);
        this.waterLevel = Math.floor(Math.random() * 100 + 1);
        this.trashLevel = Math.floor(Math.random() * 100 + 1);
        this.trashWeight = (Math.random() * 50 + 1).toFixed(1);
  
        const currentTime = new Date().toLocaleTimeString();
        if (this.tempHumidityData.length >= 10) { 
          this.tempHumidityData.shift();
          this.tempHumidityLabels.shift();
        }
        this.tempHumidityData.push({ temperature: this.airTemperature, humidity: this.airHumidity });
        this.tempHumidityLabels.push(currentTime);
  
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
  
        // Temp/Humidity Chart
        this.tempHumidityChart = new Chart(document.getElementById('tempHumidityChart'), {
          type: 'line',
          data: {
            labels: this.tempHumidityLabels,
            datasets: [
              {
                label: 'Temperature',
                data: this.tempHumidityData.map(data => data.temperature),
                borderColor: '#ff8800',
                fill: false,
                spanGaps: true 
              },
              {
                label: 'Humidity',
                data: this.tempHumidityData.map(data => data.humidity),
                borderColor: '#00aaff',
                fill: false,
                spanGaps: true 
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
  
        // Gas Chart
        this.gasChart = new Chart(document.getElementById('gasChart'), {
          type: 'doughnut',
          data: {
            datasets: [{
              data: [this.gasValue, 100 - this.gasValue],
              backgroundColor: ['#00ff00', '#e0e0e0']
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
      },
      updateCharts() {
        this.humidityChart.data.datasets[0].data = [this.airHumidity, 100 - this.airHumidity];
        this.humidityChart.update();
  
        this.temperatureGauge.data.datasets[0].data = [this.airTemperature, 50 - this.airTemperature];
        this.temperatureGauge.update();
  
        // Update Temp/Humidity Chart
        this.tempHumidityChart.data.labels = this.tempHumidityLabels;
        this.tempHumidityChart.data.datasets[0].data = this.tempHumidityData.map(data => data.temperature);
        this.tempHumidityChart.data.datasets[1].data = this.tempHumidityData.map(data => data.humidity);
        this.tempHumidityChart.update();
  
        // Update Gas Chart
        this.gasChart.data.datasets[0].data = [this.gasValue, 100 - this.gasValue];
        this.gasChart.update();
      }
    },
    mounted() {
      this.renderCharts();
      setInterval(this.generateRandomData, 5000);
    }
  });