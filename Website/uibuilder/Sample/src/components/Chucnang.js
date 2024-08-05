Vue.component('chucnang-component', {
    template: `
    <div id="chucnang-app">
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
    <div class="chucnang-container">
      <div class="chucnang-card">
        <h2>Vườn</h2>
        <div class="switch-group">
          <label>Không khí</label>
          <div class="switch-item">
            <p>Phun sương</p>
            <label class="switch">
              <input type="checkbox" v-model="settings.misting">
              <span class="slider round"></span>
            </label>
          </div>
          <div class="switch-item">
            <p>Tưới nước</p>
            <label class="switch">
              <input type="checkbox" v-model="settings.watering">
              <span class="slider round"></span>
            </label>
          </div>
          <div class="switch-item">
            <p>Quạt điều hòa</p>
            <label class="switch">
              <input type="checkbox" v-model="settings.fan">
              <span class="slider round"></span>
            </label>
          </div>
        </div>
        <div class="switch-group">
          <div class="switch-item">
            <p><strong>Chế độ an toàn</strong></p>
            <label class="switch">
              <input type="checkbox" v-model="settings.safeMode">
              <span class="slider round"></span>
            </label>
          </div>
        </div>
        <div class="switch-group">
          <label>Ngoài</label>
          <div class="switch-item">
            <p>Bật/tắt đèn</p>
            <label class="switch">
              <input type="checkbox" v-model="settings.light">
              <span class="slider round"></span>
            </label>
          </div>
          <div class="switch-item">
            <p>Phát nhạc</p>
            <label class="switch">
              <input type="checkbox" v-model="settings.music">
              <span class="slider round"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="chucnang-card">
        <h2>Phân bón</h2>
        <div class="switch-group">
          <div class="switch-item">
            <p>Quay servo</p>
            <label class="switch">
              <input type="checkbox" v-model="settings.servo">
              <span class="slider round"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="chucnang-card">
        <h2>Log</h2>
        <div class="log-group">
          <div>
            <p>Dữ liệu vườn</p>
            <input type="checkbox" v-model="log.gardenData">
          </div>
          <div>
            <p>Dữ liệu phân bón</p>
            <input type="checkbox" v-model="log.fertilizerData">
          </div>
          <button @click="downloadLog">Tải xuống</button>
        </div>
      </div>
    </div>
  </div>
    `,
    data() {
      return {
        activeTab: 'chucnang',
        settings: {
          misting: false,
          watering: false,
          fan: false,
          safeMode: false,
          light: false,
          music: false,
          servo: false
        },
        log: {
          gardenData: false,
          fertilizerData: false
        }
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
      downloadLog() {
        alert('Downloading log data...');
      }
    }
  });