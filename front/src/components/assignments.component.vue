<template>
	<v-layout>
		<v-flex md12 lg8 offset-lg2>
			<v-card class="assignments-card">
				<h2>Assignments</h2>
                
                <p
                    v-for="(error, index) in loginErrors"
                    :key="index"
                    class="login-errors"
                >{{ error }}</p>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
import StudentsApi from '../apis/students.api';

export default {
	name: 'Assignments',
	components: {
	},
	data () {
		return {
			assignments: null,
		};
	},
	methods: {
    },
    mounted() {
		StudentsApi.getAssignments().then((response) => {
            alert("aaa");
            this.assignments = response.data;
            alert(JSON.stringify(response.data));
        });
        alert("aaa");
	},
};
</script>

<style lang="stylus">
.assignments-card
	padding 2rem
	margin-top 5rem
</style>
