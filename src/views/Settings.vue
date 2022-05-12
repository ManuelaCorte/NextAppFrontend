<script>
    import { defineComponent } from "vue"

    export default defineComponent({
        data(){
            return{

            }
        },
        computed:{
            user(){
                return this.$store.getters.getUser
            }
            
        }
    })
</script>

<template>
    <div>
        
    </div>
</template>

<style>
    
</style>