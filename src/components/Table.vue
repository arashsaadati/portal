<template>
	<div id="grid-view-model">
		<div id="page-navigation" v-if="this.gridCount > 0">
			<button @click=movePages(-1)>Back</button>
			<p>{{startRow / rowsPerPage + 1}} out of {{ Math.ceil(gridCount / rowsPerPage) }}</p>
			<button @click=movePages(1)>Next</button>
		</div>

		<grid :data="this.gridData" :count="this.gridCount" :columns="this.gridCol" :size="this.gridSize" @gridRowClicked="handelGridRowClick" />
	</div>
</template>

<script>
import Grid from "./Grid.vue";

export default {
	components: { Grid },
	props: [ 'gridData','gridCol','gridSize', 'gridCount' ],
	data() {
		return {
			searchQuery: '',
			startRow: 0,
			rowsPerPage: 25,
			curPage : 1
		}
  	},
	methods: {
		handelGridRowClick(data) {
			this.$emit('rowClick', data)
		},
		movePages(amount) {
			var newStartRow = this.startRow + (amount * this.rowsPerPage);
			if (newStartRow >= 0 && newStartRow < this.gridCount) {
				this.startRow = newStartRow;
				if (this.curPage > 0 && this.curPage < this.gridCount) {
					if (amount > 0) this.curPage++;
					else this.curPage--;
					this.$emit('tablePaging', this.curPage);
				}
			}
		}
	},
	filters: {
		orderByBusinessRules: function(data) {
			return data.slice().sort(function(a, b) {
				return a.power - b.power;
			});
		}
	}
}
</script>

<style scoped>
	#grid-view-model { padding: 10px; }
	#search { margin-bottom: 10px; }
	#page-navigation { display: flex;margin-top: 5px; }
	#page-navigation p { margin-left: 5px;margin-right: 5px; }
	#page-navigation button { background-color: #42b983;border-color: #42b983;color: rgba(255, 255, 255, 0.66); }
</style>