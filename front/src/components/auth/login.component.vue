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
						v-for="(error, index) in loginErrors"
						:key="index"
						class="login-errors"
					>{{ error.description }}</p>
					<v-btn type="submit">Login</v-btn>
				</form>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
import AuthController from '../../controllers/auth.controller';

export default {
	name: 'login',
	data() {
		return {
			username: '',
			password: '',
			loginErrors: [],
		};
	},
	methods: {
		submit(event) {
			event.preventDefault();
			this.loginErrors = [];
			const data = {
				username: this.username,
				password: this.password,
			};

			AuthController.login(data).then(() => {
				this.$router.push({ name: 'index' });
			}).catch((error) => {
				this.loginErrors.push(error.response.data);
			});
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
