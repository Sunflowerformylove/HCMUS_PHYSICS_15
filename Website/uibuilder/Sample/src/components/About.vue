<template>
    <div id="about-us-app">
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
      <div class="about-us-container">
        <h2>Môn học: Vật lý cho công nghệ thông tin</h2>
        <h1>Bộ công cụ tự động hóa quá trình chăm sóc vườn tích hợp sản xuất phân bón</h1>
        <p><strong>Thành viên:</strong></p>
        <ul>
          <li>Đỗ Đình Hải - 22127095</li>
          <li>Bế Lã Anh Thư - 22127402</li>
        </ul>
        <p><strong>Lớp:</strong> 22CLC02</p>
        <p><strong>Giảng viên:</strong></p>
        <ul>
          <li>Cao Xuân Nam</li>
          <li>Đặng Hoài Thương</li>
        </ul>
      </div>
    </div>
  </template>