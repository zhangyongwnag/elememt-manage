<template>
    <div>
        <input type="text" v-model="model">
    </div>
</template>

<script>
    import * as config from '../../config'
    import * as common from '../../common'

    export default {
        props: {
            value: {
                type: String,
                required: true,
                default: ''
            },
            a:'',
        },
        data() {
            return {

            }
        },
        watch: {
            value(v) {
                // this.dispatch('input','change',v)
            }
        },
        computed: {
            model: {
                get() {
                    console.log(this.value)
                    return this.value
                },
                set(value) {
                    console.log(value)
                    console.log(this.value)
                    this.$emit('change', value)
                }
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
            broadcastTest(componentName, eventName, params) {
                this.$children.forEach(child => {
                    var name = child.$options.componentName;

                    if (name === componentName) {
                        child.$emit.apply(child, [eventName].concat(params));
                    } else {
                        this.broadcastTest.apply(child, [componentName, eventName].concat([params]));
                    }
                });
            },
            dispatch(componentName, eventName, params) {
                console.log(this)
                var parent = this.$parent || this.$root;
                var name = parent.$options.componentName;

                while (parent && (!name || name !== componentName)) {
                    parent = parent.$parent;

                    if (parent) {
                        name = parent.$options.componentName;
                    }
                }
                console.log(parent)
                if (parent) {
                    console.log('emit')
                    parent.$emit.apply(parent, [eventName].concat(params));
                }
            },
            broadcast(componentName, eventName, params) {
                this.broadcastTest.call(this, componentName, eventName, params);
            }
        },
        components: {}
    }
</script>

<style scoped>

</style>
