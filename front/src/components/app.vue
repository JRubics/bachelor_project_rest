<template>
	<v-app dark>
		<v-toolbar color="primary" dense fixed app>
			<v-toolbar-title>
				<router-link :to="{ name: 'index' }">Home</router-link>
			</v-toolbar-title>
			<v-spacer></v-spacer>

			<v-toolbar-items>
				<v-btn
					flat
					v-for="item in toolbarItems"
					:key="item.text"
					:to="item.path"
				>
				<v-icon left>{{ item.icon }}</v-icon>
				{{ item.text }}
				</v-btn>
			</v-toolbar-items>
		</v-toolbar>
		<v-content>
			<router-view></router-view>
		</v-content>
	</v-app>
</template>

<script>
import { mapGetters } from 'vuex';

import AuthController from '../controllers/auth.controller.js';

export default {
	name: 'app',
	data() {
		return {
			// toolbarItems: {
			// 	'loggedIn': [
			// 		{ icon: 'fas fa-code-branch ', text: 'Perk trees', path: '/trees' },
			// 		{ icon: 'account_circle', text: 'Admin panel', path: '/admin' },
			// 		{ icon: 'exit_to_app', text: 'Logout', path: '/logout' },
			// 	],
			// 	'loggedOut': [{ icon: 'lock_open', text: 'Login', path: '/login' }],
			// },
			toolbarItems: [
				{ icon: 'fas fa-user-cog', text: 'Admin panel', path: '/admin' },
				{ icon: 'fas fa-code-branch', text: 'Perk trees', path: '/trees' },
			],
		};
	},
	computed: {
		...mapGetters(['token']),
		authStatus() {
			return this.token ? 'loggedIn' : 'loggedOut';
		},
	},
	mounted() {
		AuthController.setupToken();
	},
};
</script>

<style lang="stylus">
@import '../stylus/app.styl'
</style>

