 <script>

    import { defineComponent } from "vue";

    export default defineComponent({

        props: {
            label: String, 
            type: String, 
            modelValue: String
        },
        computed:{
            inputValue: {
                get(){
                    return this.modelValue
                },
                set(value){
                    this.$emit("update:modelValue", value)
                }
            }
        }

    });
</script>


<template>
    <form class="form-floating">
        <input class="form-control" v-bind:type="type" v-model="inputValue"/>
        <label class="label label-default"> {{label}} </label>
        <br><br>
    </form>
    
</template>

