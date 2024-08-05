document.addEventListener('DOMContentLoaded', function () {
    new Vue({
      el: '#app',
      data: {
        currentComponent: null
      },
      created() {
        this.loadComponent('Login');
        this.loadComponent('SignUp');
        this.loadComponent('Vuon');
        this.loadComponent('About');
        this.loadComponent('Phanbon');
        this.loadComponent('Chucnang');
      },
      methods: {
        loadComponent(componentName) {
          const script = document.createElement('script');
          script.src = `./components/${componentName}.js`;
          script.onload = () => {
            this.currentComponent = 'login-component';
          };
          document.head.appendChild(script);
        }
      }
    });
  });
  