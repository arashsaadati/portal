<template>
	<div id="grid-view-model">
		<form id="search">
			Search
			<input name="query" v-model="searchQuery">
		</form>

		<grid :data="this.gridData" :columns="this.gridColumns" />

		<div id="page-navigation">
			<button @click=movePages(-1)>Back</button>
			<p>{{startRow / rowsPerPage + 1}} out of {{gridData.length / rowsPerPage}}</p>
			<button @click=movePages(1)>Next</button>
		</div>
	</div>
</template>

<script>
import Grid from "./Grid.vue";

export default {
	components: { Grid },
	data() {
		return {
			searchQuery: '',
			gridColumns: ['name', 'power'],
			startRow: 0,
			rowsPerPage: 10,
			gridData: [{
					name: 'Chuck Norris',
					power: Infinity
				}, 
				{
					name: 'Bruce Lee',
					power: 9000
				}, {
					name: 'Jackie Chan',
					power: 7000
				}, {
					name: 'Jet Li',
					power: 8000
			}]
		}
  	},
	methods: {
		movePages: function(amount) {
				var newStartRow = this.startRow + (amount * this.rowsPerPage);
				if (newStartRow >= 0 && newStartRow < gridData.length) {
					this.startRow = newStartRow;
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
	table { border: 2px solid #42b983;border-radius: 3px;background-color: #fff; }
	th { background-color: #42b983;color: rgba(255, 255, 255, 0.66);cursor: pointer;-user-select: none; }
	td { background-color: #f9f9f9; }
	th, td { min-width: 120px;padding: 10px 20px; }
	#search { margin-bottom: 10px; }
	#page-navigation { display: flex;margin-top: 5px; }
	#page-navigation p { margin-left: 5px;margin-right: 5px; }
	#page-navigation button { background-color: #42b983;border-color: #42b983;color: rgba(255, 255, 255, 0.66); }
</style>