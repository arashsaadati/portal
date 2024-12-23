<template>
    <div class="fobject">
        <button :class="buttonClass" :type="buttonType ? buttonType : 'button'">{{ this.buttonValue }}</button>
    </div>
</template>

<script>
export default {
    props: [ 'buttonValue','buttonName','buttonType','buttonClass' ]
}
</script>