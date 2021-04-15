<template>
    <div>
        {{ message }}
        {{ position }}
    </div>
</template>
<script>
    export default {
        props: [ 'position' ],

        mounted() {
            this.$emit('close')
        },
        data() {
            return {
                message: 'hello'
            }
        },

    }
</script>
