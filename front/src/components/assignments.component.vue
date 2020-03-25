<template>
	<v-layout>
		<v-flex md12 lg8 offset-lg2>
			<v-card class="assignments-card">
				<h2>Assignments</h2>
								<v-data-table
					:headers="headers"
					:items="assignments"
					:pagination.sync=pagination
					class="elevation-1"
				>
					<template v-slot:items="props">
						<td>{{ props.item.id }}</td>
						<td>{{ props.item.filename }}</td>
						<td> {{ props.item.fixture.fixturename }} </td>
						<td>{{ time(props.item.date_added) }}</td>
						<td>
							<v-btn color="primary" @click="result(props.item.result)" v-if="props.item.result">Result</v-btn>
							<span v-if="!props.item.result">In progress</span>
						</td>
					</template>
				</v-data-table>
				<modal ref="modal"></modal>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
import Modal from '../components/modal.component';
import { mapGetters, mapActions } from 'vuex';
import * as moment from 'moment';

export default {
	name: 'Assignments',
	components: {
		'modal': Modal,
	},
	data () {
		return {
			headers: [
				{ text: 'ID', value: 'id' },
				{ text: 'Filename', value: 'filename' },
				{ text: 'Problem', value: 'problem' },
				{ text: 'Time', value: 'time' },
				{ text: 'Result', value: 'result' },
			],
			pagination: {
				descending: true,
				sortBy: 'id',
				rowsPerPage: 5,
			},
		};
	},
	computed: {
		...mapGetters(['assignments']),
	},
	methods: {
		...mapActions(['initAssignments']),
		result(text) {
			this.$refs.modal.show(text);
		},
		time(time) {
			return moment.utc(time).local().format('YYYY-MM-DD HH:mm:ss');
		},
	},
	created() {
		this.initAssignments();
	},
};
</script>

<style lang="stylus">
.assignments-card
	padding 2rem
	margin-top 5rem
</style>
