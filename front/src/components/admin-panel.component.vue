<template>
	<v-layout>
		<v-flex md12 lg6 offset-lg3>
			<v-card class="admin-form-card">
				<upload-button :fileChangedCallback="upload"/>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
import UploadButton from 'vuetify-upload-button';

import PerksController from '../controllers/perks.controller';

export default {
	name: 'admin-panel',
	components: {
		UploadButton,
	},
	data() {
		return {
			username: '',
			password: '',
			passwordConfirm: '',
			admin: false,
			messages: [],
		};
	},
	methods: {
		upload(file) {
			PerksController.uploadPerks(file);
		},
	},
};
</script>

<style lang="stylus">
.admin-form-card
	margin-top 5rem
	padding 2rem
</style>

