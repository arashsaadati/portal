<template>
    <div class="fobject">
        <span class="label" v-if="this.inputLabel">{{ this.inputLabel }}</span>
        <input :v-model="inputName" :type="inputType" :value="inputValue">
    </div>
</template>

<script>
export default {
    props: [ 'inputValue','inputLabel','inputName','inputType' ]
}
</script>

<style>

</style>