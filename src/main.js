import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/router.js";
import store from './store'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "./plugins/font-awesome";
import axios from "axios";
import './assets/css/main.css';
import './assets/css/app.css';
import './assets/css/animate.min.css';
import VueNumberFormat from 'vue-number-format';
import moment from 'moment';


axios.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

createApp(App)
    .use(store)
    .use(router)
    .use(moment)
    .use(VueNumberFormat, {prefix: ' ', suffix: ' €', decimal: ',', thousand: ' ', precision:0})
    .component("fa", FontAwesomeIcon)
    .mount('#app')
