import Vue from 'vue';
import Vuetify from 'vuetify';
// import colors from 'vuetify/es5/util/colors';
import 'vuetify/dist/vuetify.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

Vue.use(Vuetify, {
	theme: {
		primary: '#458588',
		secondary: '#282828',
		accent: '#689d6a',
		error: '#cc241d',
		info: '#458588',
		success: '#98971a',
		warning: '#d79921',
	},
	iconfont: 'fa',
});

