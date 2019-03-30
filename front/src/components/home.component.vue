<template>
	<v-container>
        <upload-file></upload-file>
        <br>
        <assignments></assignments>
	</v-container>
</template>

<script>
import UploadFile from '../components/upload-file.component';
import Assignments from '../components/assignments.component';

export default {
	name: 'Home',
	components: {
        'upload-file': UploadFile,
        'assignments': Assignments,
	},
	data () {
		return {
		};
	},
	methods: {
	},
};
</script>

