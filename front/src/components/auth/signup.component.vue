<template>
	<v-layout>
		<v-flex md12 lg6 offset-lg3 >
			<v-card class="signup-form-card">
				<h3>Sign up</h3>
				<form @submit="submit">
					<v-text-field
						v-model="username"
						name="username"
						label="Username"
						type="text"
						required
						disabled>
					</v-text-field>
					<!-- <v-text-field
						v-model="email"
						name="email"
						label="Email"
						type="email"
						required
						>
					</v-text-field>
					<v-text-field
						v-model="name"
						name="name"
						label="Name"
						type="text"
						required>
					</v-text-field> -->
					<v-text-field
						v-model="password"
						name="password"
						label="Password"
						type="password"
						required>
					</v-text-field>
					<v-text-field
						v-model="passwordConfirm"
						name="passwordConfirm"
						label="Confirm password"
						type="password"
						required>
					</v-text-field>
					<p v-for="(error, index) in authErrors"
						:key="index"
						class="signup-errors">
						{{ error }}
					</p>
					<v-btn type="submit">Signup</v-btn>
				</form>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'Signup',
	data() {
		return {
			username: '',
			// email: '',
			// name: '',
			password: '',
			passwordConfirm: '',
		};
	},
	computed: {
		...mapGetters(['authErrors']),
	},
	methods: {
		...mapActions(['signup', 'addAuthError']),
		submit(event) {
			event.preventDefault();
			this.signupErrors = [];
			if (this.password !== this.passwordConfirm) {
				this.addAuthError('Password mismatch');
				return;
			}

			this.signup({password: this.password, token: this.$route.query.token});
		},
	},
	created() {
		const token = this.$route.query.token;
		if (!token) {
			this.$router.push({ name: 'login' });
		}
		try {
			this.username = JSON.parse(atob(token.split('.')[1])).username;
		} catch (error) {
				this.addAuthError('Invalid Token');
		}
	},
};
</script>

<style lang="stylus">
.signup-form-card
	padding 2rem
	margin-top 5rem

.signup-errors
	color red
</style>
