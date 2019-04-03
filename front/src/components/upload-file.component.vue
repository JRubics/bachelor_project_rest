<template>
	<v-layout>
		<v-flex md12 lg6 offset-lg3>
			<v-card class="upload-file-form-card">
				<h2>Upload</h2>
                <form @submit="submit">
                    <v-layout>
                        <v-flex md2>
                            <upload-btn :fileChangedCallback="upload" class="upload-button"></upload-btn>
                        </v-flex>
                        <v-flex md8>
                            <v-card-text>{{file ? file.name:""}}</v-card-text>
                        </v-flex>
                        <v-flex md2>
                            <v-btn color="accent" type="submit" v-if="file">Submit</v-btn>
                        </v-flex>
                    </v-layout>
                </form>
                <p
                    v-for="(error, index) in errors"
                    :key="index"
                    class="login-errors"
                >{{ error }}</p>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
import UploadButton from 'vuetify-upload-button';
import StudentsApi from '../apis/students.api';

export default {
	name: 'UploadFile',
	components: {
        'upload-btn': UploadButton,
	},
	data() {
      return {
        file: null,
        errors: [],
      };
    },
	methods: {
        upload(file) {
            this.file = file;
        },
        submit(event) {
            event.preventDefault();

            const data = new FormData();
            data.append('file', this.file);

            StudentsApi.uploadFile(data).then((response) => {
                if (response.data.error) {
                    this.errors.push(response.data.error);
                } else {
                    this.$emit('upload');
                    this.file = null;
                }
			}).catch((error) => {
				this.errors.push(error.response.data);
			});
        },
	},
};
</script>

<style lang="stylus">
.upload-file-form-card
	padding 2rem
	margin-top 5rem

.upload-button
	padding-left 0px !important
</style>
