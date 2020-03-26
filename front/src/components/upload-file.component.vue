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
											<p v-html=fixtureText></p>
										</v-layout>
										<v-layout>
												<v-flex md2>
														<upload-btn color="accent" :fileChangedCallback="upload" class="upload-button"></upload-btn>
												</v-flex>
												<v-flex md8>
														<v-card-text>{{file ? file.name:""}}</v-card-text>
												</v-flex>
												<v-flex md2>
														<v-btn color="success" type="submit" :disabled="loading" v-if="file && selected_fixture">Submit</v-btn>
												</v-flex>
										</v-layout>
								</form>
								<p
									v-for="(error, index) in errors"
									:key="index"
									class="error--text"
								>{{ error }}</p>
								<modal ref="modal"></modal>
						</v-card>
				</v-flex>
		</v-layout>
</template>

<script>
import UploadButton from 'vuetify-upload-button';
import Modal from './modal.component';
import { mapGetters, mapActions } from 'vuex';

export default {
		name: 'UploadFile',
		components: {
				'upload-btn': UploadButton,
				'modal': Modal,
		},
		data() {
			return {
				file: null,
				selected_fixture: null,
			};
		},
		computed: {
			...mapGetters([
					'fixtures',
					'errors',
					'loading',
			]),
			fixtureText() {
				if (!this.selected_fixture) {
					return '';
				}
				return this.fixtures[this.selected_fixture - 1].fixturetext;
			},
		},
		methods: {
				...mapActions([
					'addAssignment',
					'initFixtures',
				]),
				upload(file) {
						this.file = file;
				},
				async submit(event) {
						event.preventDefault();

						await this.addAssignment({ file: this.file, fixture_id: this.selected_fixture });

						this.file = null;
				},
		},
		created() {
				this.initFixtures();
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
