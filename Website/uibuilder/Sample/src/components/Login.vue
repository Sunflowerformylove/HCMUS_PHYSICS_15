<template>
    <div id="login-app">
      <header>
        <h1>Dashboard</h1>
      </header>
      <div class="login-container-wrapper">
        <div class="login-container">
          <form @submit.prevent="login">
            <h2>Sign In</h2>
            <div class="input-group">
              <input type="text" id="username" v-model="username" placeholder="Username" required>
            </div>
            <div class="input-group">
              <input type="password" id="password" v-model="password" placeholder="Password" required>
            </div>
            <button type="submit">Submit</button>
            <a href="#" class="signup-link" @click.prevent="navigateToSignUp" >Sign Up</a>
          </form>
        </div>
      </div>
    </div>
  </template>
  