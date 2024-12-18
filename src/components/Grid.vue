<template>
	<!-- <table>
		<thead>
			<tr>
				<th v-for="item in columns"> {{ item.toUpperCase() }} </th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="entry in data">
				<td v-for="key in this.columns"> {{ entry[key] }} </td>
			</tr>
		</tbody>
	</table> -->

	<div class="table_holder">
		<div class="header grid" :style="{ 'grid-template-columns': size }">
			<div class="head_item" v-for="item in columns"> {{ item.toUpperCase() }} </div>
		</div>
		<div class="rows">
			<a class="row grid" :style="{ 'grid-template-columns': size }" target="_self" v-for="entry in data">
				<div v-for="key in this.columns" class="row_item" :data-title="key"> {{ entry[key] }} </div>
			</a>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		data: Array,
		columns: Array
	}
}
</script>