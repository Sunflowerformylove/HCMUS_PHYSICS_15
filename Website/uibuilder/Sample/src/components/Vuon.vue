<template>
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
</template>