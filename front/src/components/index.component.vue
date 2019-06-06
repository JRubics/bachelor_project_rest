<template>
	<v-container>
        <upload-file @upload="upload"></upload-file>
        <br>
        <assignments ref="assignments"></assignments>
	</v-container>
</template>

<script>
import UploadFile from './upload-file.component';
import Assignments from './assignments.component';

export default {
	name: 'Index',
	components: {
		'upload-file': UploadFile,
		'assignments': Assignments,
	},
	data () {
		return {
			uploaded: false,
		};
	},
	methods: {
		upload() {
			this.$refs.assignments.upload();
		},
	},
};
</script>

