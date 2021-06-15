import { createApp, provide, h } from 'vue'
import App from './App.vue'
import router from './router'

import { DefaultApolloClient } from "@vue/apollo-composable";
import apolloClient from './apollo-server';


import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);

  },
  render() {
    return h(App)
  }
}).use(VueSweetalert2).use(router).mount('#app')
