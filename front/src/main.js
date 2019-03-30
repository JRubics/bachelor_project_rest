import Axios from 'axios';
import Vue from 'vue';
import './plugins/vuetify';

import App from './components/app.vue';
import { config } from './config';
import router from './router';
import store from './store';

import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import AuthController from './controllers/auth.controller.js';

Vue.config.productionTip = false;

const configureHttp = () => {
	Axios.defaults.baseURL = config.getApiUrl();
	Axios.defaults.headers.Accept = 'application/json';
	Axios.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			if (error.response && error.response.status === 401) {
				// AuthController.refreshToken().catch(() => {
					// router.push({
						// name: 'logout',
					// });
				// });
				router.push({
					name: 'logout',
				});
			}

			return Promise.reject(error);
		}
	);
};

configureHttp();

AuthController.refreshToken();
AuthController.setupToken(); // FIKSAJ!!!! event + listeneri

new Vue({
	router,
	store,
	render (h) {
		return h(App);
	},
}).$mount('#app');

