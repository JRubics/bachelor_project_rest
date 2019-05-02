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
						<td>{{ props.item.date_added }}</td>
						<td>
							<v-btn color="primary" @click="result(props.item.result)" v-if="props.item.result">Result</v-btn>
							<span v-if="!props.item.result">In progress</span>
						</td>
					</template>
				</v-data-table>
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
import StudentsApi from '../apis/students.api';
import Modal from '../components/modal.component';

export default {
	name: 'Assignments',
	components: {
		'modal': Modal,
	},
	data () {
		return {
			errors: null,
			assignments: [],
			headers: [
				{ text: 'ID', value: 'id' },
				{ text: 'Filename', value: 'filename' },
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
	methods: {
		result(text) {
			this.$refs.modal.show(text);
		},
		upload() {
			StudentsApi.getLastAssignment().then((response) => {
				this.assignments.push(response.data);
			}).catch((error) => {
				this.errors.push(error.response.data);
			});
		},
    },
    mounted() {
		StudentsApi.getAssignments().then((response) => {
			this.assignments = response.data;
		}).catch((error) => {
			this.errors.push(error.response.data);
		});
	},
};
</script>

<style lang="stylus">
.assignments-card
	padding 2rem
	margin-top 5rem
</style>
