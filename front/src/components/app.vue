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
					v-for="item in toolbarItems[authStatus]"
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

export default {
	name: 'app',
	data() {
		return {
			toolbarItems: {
				'true': [{ icon: 'fas fa-user-cog', text: 'Logout', path: '/logout' }],
				'false': [{ icon: 'lock_open', text: 'Login', path: '/login' }],
			},
		};
	},
	computed: {
		...mapGetters(['authStatus']),
	},
};
</script>

<style lang="stylus">
@import '../stylus/app.styl'
</style>
