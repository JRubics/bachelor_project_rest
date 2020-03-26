<template>
	<v-dialog
		v-model="dialog"
		content-class="results-modal"
		persistent
	>
		<v-card>
			<v-card-title
				primary-title
			>
				<h2>Result</h2>
			</v-card-title>

			<v-card-text>
				<pre>{{modalText}}</pre>
			</v-card-text>

			<v-divider></v-divider>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
					color="accent"
					@click="closeModal"
				>
					CLOSE
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	computed: {
		...mapGetters(['dialog', 'modalText']),
	},
	methods: {
		...mapActions(['closeModal']),
	},
};
</script>

<style lang="stylus">
.results-modal
	width auto
</style>
