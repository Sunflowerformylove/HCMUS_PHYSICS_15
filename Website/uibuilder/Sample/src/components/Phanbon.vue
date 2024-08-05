<template>
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
</template>