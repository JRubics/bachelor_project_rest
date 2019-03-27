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

export default {
	name: 'Assignments',
	components: {
	},
	data () {
		return {
		};
	},
	methods: {
	},
};
</script>

<style lang="stylus">
.assignments-card
	padding 2rem
	margin-top 5rem
</style>
