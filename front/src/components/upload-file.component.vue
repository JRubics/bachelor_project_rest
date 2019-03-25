<template>
	<v-layout>
		<v-flex md12 lg6 offset-lg3>
			<v-card class="login-form-card">
				<h2>Upload</h2>
				<form @submit="submit">
					<input type="file" multiple>
					<p
						v-for="(error, index) in loginErrors"
						:key="index"
						class="login-errors"
					>{{ error.description }}</p>
					<v-btn type="submit">UPLOAD</v-btn>
				</form>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>

export default {
	name: 'UploadFile',
	components: {
	},
	data () {
		return {
		};
	},
	methods: {
	},
};
</script>
