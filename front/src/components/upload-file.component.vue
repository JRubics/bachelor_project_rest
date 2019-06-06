<template>
	<v-layout>
		<v-flex md12 lg6 offset-lg3>
			<v-card class="upload-file-form-card">
				<h2>Upload</h2>
                <form @submit="submit">
                    <v-layout>
                        <v-flex md6>
                            <v-select :items="fixtures" v-model="selected_fixture" item-text="fixturename" item-value="id" label="Choose problem"></v-select>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex md2>
                            <upload-btn :fileChangedCallback="upload" class="upload-button"></upload-btn>
                        </v-flex>
                        <v-flex md8>
                            <v-card-text>{{file ? file.name:""}}</v-card-text>
                        </v-flex>
                        <v-flex md2>
                            <v-btn color="accent" type="submit" :disabled="loading" v-if="file && selected_fixture">Submit</v-btn>
                        </v-flex>
                    </v-layout>
                </form>
                <p
                    v-for="(error, index) in errors"
                    :key="index"
                    class="login-errors"
                >{{ error }}</p>
                <modal ref="modal"></modal>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
import UploadButton from 'vuetify-upload-button';
import StudentsApi from '../apis/students.api';
import Modal from '../components/modal.component';

export default {
	name: 'UploadFile',
	components: {
        'upload-btn': UploadButton,
        'modal': Modal,
	},
	data() {
      return {
        file: null,
        fixtures: [],
        selected_fixture: null,
        errors: [],
        loading: false,
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
            data.append('fixture_id', this.selected_fixture);
            this.loading = true;

            StudentsApi.uploadFile(data).then((response) => {
                if (response.data.error) {
                    this.errors.push(response.data.error);
                } else {
                    this.$emit('upload');
                    this.file = null;
                }
                this.$refs.modal.show(response.data);
			}).catch((error) => {
				this.errors.push(error.response.data);
			}).finally(() => {
                this.loading = false;
            });
        },
    },
    mounted() {
		StudentsApi.getFixtures().then((response) => {
            this.fixtures = response.data;
		}).catch((error) => {
			this.errors.push(error.response.data);
		});
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
