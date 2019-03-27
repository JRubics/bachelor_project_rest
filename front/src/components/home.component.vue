<template>
	<v-container>
		<h1>Welcome to Upload</h1>
        <upload-file></upload-file>
        <upload-file></upload-file>
	</v-container>
</template>

<script>
import UploadFile from '../components/upload-file.component';

export default {
	name: 'Index',
	components: {
        'upload-file': UploadFile
	},
	data () {
		return {
		};
	},
	methods: {
	},
};
</script>

