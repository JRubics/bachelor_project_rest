<template>
	<v-container>
				<upload-file></upload-file>
				<br>
				<assignments></assignments>
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
};
</script>
