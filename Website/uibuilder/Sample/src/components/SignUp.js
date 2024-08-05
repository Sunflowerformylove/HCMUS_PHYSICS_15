Vue.component('signup-component', {
    template: `
      <div id="signup-app">
        <header>
          <h1>Dashboard</h1>
        </header>
        <div class="signup-container-wrapper">
          <div class="signup-container">
            <form @submit.prevent="signUp">
              <h2>Sign Up</h2>
              <div class="input-group">
                <input type="text" id="username" v-model="username" placeholder="Username" required>
              </div>
              <div class="input-group">
                <input type="password" id="password" v-model="password" placeholder="Password" required>
              </div>
              <div class="input-group">
                <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="Re-enter password" required>
              </div>
              <button type="submit">Submit</button>
              <a href="#" class="signin-link" @click.prevent="navigateToSignIn">Sign In</a>
            </form>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        username: '',
        password: '',
        confirmPassword: '',
        error: ''
      };
    },
    methods: {
      signUp() {
        if (this.password !== this.confirmPassword) {
          this.error = 'Passwords do not match';
          return;
        }
        uibuilder.send({
          topic: 'signUp',
          payload: {
            username: this.username,
            password: this.password
          }
        });
      },
      navigateToSignIn() {
        this.$root.currentComponent = 'login-component';
      }
    },
    mounted() {
      uibuilder.start();
      uibuilder.onChange('msg', (msg) => {
        if (msg.topic === 'signUpResponse') {
          if (msg.payload.success) {
            window.location.href = '/';
          } else {
            this.error = 'Sign up failed';
          }
        }
      });
    }
  });