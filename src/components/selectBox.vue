<template>
    <div class="fobject" :class="selectClass">
        <span class="title" v-if="this.selectLabel">{{ this.selectLabel }}</span>
        <select @change="BroadcastValue" v-if="!selectHtml"><option v-for="(item, index) in selectData" :value="item.value">{{ item.title }}</option></select>
		<select @change="BroadcastValue" v-else="selectHtml" v-html="selectHtml"></select>
    </div>
</template>

<script>
export default {
    props: [ 'selectName','selectData','selectValue','selectHtml','selectLabel','selectClass' ],
	methods: {
		BroadcastValue(e) {
			this.$emit('ValueBrodcaster', [e.target.value, this.selectName])
		}
	}
}
</script>

<style>
</style>