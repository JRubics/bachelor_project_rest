<template>
	<v-layout>
		<v-flex md12 lg6 offset-lg3>
			<v-card class="login-form-card">
				<h2>Login</h2>
				<form @submit="submit">
					<v-text-field
						v-model="username"
						name="username"
						label="Username"
						type="text"
					></v-text-field>
					<v-text-field
						v-model="password"
						name="password"
						label="Password"
						type="password"
					></v-text-field>
					<p
						v-for="(error, index) in authErrors"
						:key="index"
						class="login-errors"
					>{{ error }}</p>
					<v-btn type="submit">Login</v-btn>
				</form>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'login',
	data() {
		return {
			username: '',
			password: '',
		};
	},
	computed: {
		...mapGetters(['authErrors']),
	},
	methods: {
		...mapActions(['login']),
		async submit(event) {
			event.preventDefault();
			const data = {
				username: this.username,
				password: this.password,
			};

			await this.login(data);
		},
	},
};
</script>

<style lang="stylus">
.login-form-card
	padding 2rem
	margin-top 5rem

.login-errors
	color red
</style>
