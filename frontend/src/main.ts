import './assets/main.css';
import '../node_modules/uikit/dist/css/uikit.min.css';

import axios from 'axios';
import { createPinia } from 'pinia';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

UIkit.use(Icons);

axios.interceptors.response.use((response) => {
  if (response.status === 200 || response.status === 201) {
    if (Object.keys(response.data).find((key) => key === "error_code")) {
      let message = "";
      switch (response.data["error_code"]) {
        case 1: {
          message = "Общая ошибка: обратитесь в поддержку для уточнения";
          break;
        }
        case 2: {
          message = "Ошибка проверки цифровой подписи";
          break;
        }
        case 3: {
          message = "Метод недоступен";
          break;
        }
      }

      UIkit.notification({
        message: message,
        pos: "bottom-center",
        status: "danger",
        timeout: 2500,
      });
    }

    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
});

//Vue.prototype.$axios = axios;

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
