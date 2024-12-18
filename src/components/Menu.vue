<template>
	<ul>
		<li v-for="item in menuData" :key="item.id" :class="[!item.uri && item.parent ? 'isParent' : 'mitem' , item.expand ? 'expand' : '']">
			<router-link v-if="item.uri" :to="item.uri" >{{item.title}}</router-link>
			<a v-else @click="exapndMenu(item.id, item.expand)">
				{{item.title}}
			<span smticon v-if="!item.expand">keyboard_arrow_down</span>
				<span smticon v-if="item.expand">keyboard_arrow_up</span>
			</a>

			<Menu :menuData="item.node" v-show="item.expand" v-if="item.node"/>
		</li>
	</ul>
</template>

<script>

export default {
	props: [ 'menuData' ],
	methods: {
		exapndMenu(id, expand) {
			// fetch('http://localhost:3000/menu/' + id, {
			// 		method : 'PATCH',
			// 		headers: { 'Content-Type': 'application/json' },
			// 		body: JSON.stringify({ expand:  !expand })
			// 	})
			// 	.then(() => )

			this.$emit('expandSideMene', id, !expand)
		}
	},
	data() {
		return {}
	}
}
</script>


