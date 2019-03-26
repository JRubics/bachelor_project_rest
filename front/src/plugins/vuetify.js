import Vue from 'vue';
import Vuetify from 'vuetify';
// import colors from 'vuetify/es5/util/colors';
import 'vuetify/dist/vuetify.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

Vue.use(Vuetify, {
	theme: {
		primary: '#704f6e',
		secondary: '#282828',
		accent: '#547660',
		error: '#cc241d',
		info: '#458588',
		success: '#98971a',
		warning: '#d79921',
	},
	iconfont: 'fa',
});

