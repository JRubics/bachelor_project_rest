import Vue from 'vue';
import Vuetify from 'vuetify';
// import colors from 'vuetify/es5/util/colors';
import 'vuetify/dist/vuetify.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

Vue.use(Vuetify, {
	theme: {
		primary: '#392648',
		secondary: '#282828',
		accent: '#458588',
		error: '#cc241d',
		info: '#458588',
		success: '#98971a',
		warning: '#d79921',
	},
	iconfont: 'fa',
});

