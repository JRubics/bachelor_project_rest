<template>
	<v-container grid-list-md text-xs-center class="tree-list">
		<v-layout row wrap>
			<v-flex
				v-for="(tree, index) in trees"
				:key="index"
				sm2
				xs6
			>
				<v-btn
					block
					color="secondary"
					@click="openPerks(index)"
				>{{ tree }}</v-btn>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
// import * as _ from 'lodash';

import PerksController from '../controllers/perks.controller';

export default {
	name: 'trees',
	components: {
	},
	data () {
		return {
			trees: null,
		};
	},
	methods: {
		openPerks(index) {
			this.$router.push({ name: 'perks', params: { tree: index } });
		},
	},
	mounted() {
		PerksController.getTrees().then((response) => {
			this.trees = response.data;
		});
	},
};
</script>

<style lang="stylus">
@import '../stylus/trees.styl'
</style>

