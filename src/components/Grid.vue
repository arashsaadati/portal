<template>
	<div class="table_holder">
		<div class="header grid" :style="{ 'grid-template-columns': size }">
			<div class="head_item" v-for="item in columns"> {{ item.toUpperCase() }} </div>
		</div>
		<div class="rows">
			<a class="row grid" :style="{ 'grid-template-columns': size }" target="_self" v-for="entry in data" @click="this.$emit('gridRowClicked', entry)">
				<div v-for="key in this.columns" class="row_item" :data-title="key"> {{ entry[key] }} </div>
			</a>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		data: Array,
		columns: Array,
		size: String
	}
}
</script>
<style scoped>
	.table_holder { width:100%; border:1px solid rgb(238 238 241); border-radius:5px;background-color: #fff; position: relative;}
	.table_holder .header { grid-gap:0;position: sticky; top: 0; background-color: #fff; border-radius: 5px 5px 0 0; border-bottom: 1px solid rgb(238 238 241); margin-bottom: -0.5px; }
	.table_holder .header .head_item { color: rgb(46 46 56);display: flex;font-weight: 800;justify-content: flex-start;padding: 20px 15px; }
	.table_holder .row { grid-gap:0; cursor: pointer;  }
	.table_holder .row .row_item { justify-content: center;border-top: 1px solid rgb(238 238 241);padding: 15px;font-size: 14px;font-weight: 300;display: flex;flex-direction: column;align-items: flex-start; }
	.table_holder .row .row_item strong { display:inline-flex; }
	.table_holder .row .row_item strong,
	.table_holder .row .row_item b { font-weight:600 }
	.table_holder .row .row_item.ltr { direction:ltr; }
	.table_holder .row:hover .row_item { background: rgb(247 247 248);}
</style>