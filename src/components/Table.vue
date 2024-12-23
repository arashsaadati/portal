<template>
	<div id="grid-view-model">
		<div id="page-navigation" v-if="this.gridCount > 0">
			<button class="btn" :class="(curPage > 1) ? 'info2' : 'disabled'" @click=movePages(-1)>Back</button>
			<p>{{ Math.ceil(startRow / rowsPerPage + 1) }} of {{ Math.ceil(gridCount / rowsPerPage) }}</p>
			<button class="btn" :class="(curPage < Math.ceil(gridCount / rowsPerPage)) ? 'info2' : 'disabled'" @click=movePages(1)>Next</button>
		</div>

		<grid :data="this.gridData" :count="this.gridCount" :columns="this.gridCol" :size="this.gridSize" @gridRowClicked="handelGridRowClick" />
	</div>
</template>

<script>
import Grid from "./Grid.vue";

export default {
	components: { Grid },
	props: [ 'gridData','gridCol','gridSize','gridCount','gridCurPage','gridStartRow','gridRowCount' ],
	data() {
		return {
			searchQuery: '',
			startRow: this.gridStartRow,
			rowsPerPage: this.gridRowCount,
			curPage : this.gridCurPage
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
	computed() {
		console.log(1)
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
	#page-navigation { display: flex;margin-bottom: 18px;align-items: center;margin-left: auto;justify-content: flex-end; }
	#page-navigation p { margin-left: 5px;margin-right: 5px; }
	#page-navigation button { background-color: #42b983;border-color: #42b983;color: rgba(255, 255, 255, 0.66); }
</style>