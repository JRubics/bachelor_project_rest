<template>
	<v-container class="perktree">
		<v-layout row wrap>
			<v-flex md8 offset-md2 sm12>
				<v-card>
					<div id="perktree"></div>
				</v-card>
			</v-flex>
		</v-layout>
		<v-dialog
			v-model="dialog"
			width="500"
		>
			<v-card>
				<v-card-title
				class="headline grey darken-2"
				primary-title
			>{{ perk }}</v-card-title>
				<v-card-text>{{ effect }}</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="primary"
						flat
						@click="dialog = false"
					>Colse</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script>
import * as d3 from 'd3';
import Sankey from 'd3.chart.sankey';
import * as _ from 'lodash';

import PerksController from '../controllers/perks.controller';

export default {
	name: 'perks',
	components: {
	},
	data () {
		return {
			dialog: false,
			perk: '',
			effect: '',
			colorScheme: [
				'#458588',
				'#d79921',
				'#98971a',
				'#cc241d',
				'#d5c4a1',
			],
		};
	},
	methods: {
		renderGraph(graphData) {
			const svg = d3.select('#perktree').append('svg');
			const chart = new Sankey(svg);
			const nodes = graphData.nodes;

			chart.nodeWidth(24)
				.nodePadding(6)
				.spread(false)
				.colorNodes((name, node) => {
					return this.colorScheme[node.colour];
				})
				.on('node:click', (node) => {
					const clicked_node = _.find(nodes, (n) => {
						return n.name === node.name;
					});
					if (clicked_node.effect) {
						this.perk = clicked_node.name;
						this.effect = clicked_node.effect;
						this.dialog = true;
					}
				})
				.draw(graphData);
		},
	},
	mounted() {
		PerksController.getPerks(this.$route.params.tree).then((response) => {
			this.renderGraph(response.data);
		});
	},
};
</script>

<style lang="stylus">
@import '../stylus/perks.styl'
</style>

