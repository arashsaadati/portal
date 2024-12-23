<template>
    <div class="fobject" :class="inputClass">
        <span class="title" v-if="this.inputLabel">{{ this.inputLabel }}</span>
        <input @change="BroadcastValue" @keyup="BroadcastValue" :type="inputType" :value="inputValue">
    </div>
</template>

<script>
export default {
    props: [ 'inputValue','inputLabel','inputName','inputType','inputClass' ],
	methods: {
		BroadcastValue(e) {
			this.$emit('ValueBrodcaster', [e.target.value, this.inputName])
		}
	}
}
</script>