import Vue from 'vue';
import Vuetify from 'vuetify';
// import colors from 'vuetify/es5/util/colors';
import 'vuetify/dist/vuetify.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

Vue.use(Vuetify, {
	theme: {
		primary: '#E1BEE7',
		secondary: '#282828',
		accent: '#704f6e',
		error: '#FF5252',
		info: '#458588',
		success: '#3b7770',
		warning: '#d79921',
	},
	iconfont: 'fa',
});

