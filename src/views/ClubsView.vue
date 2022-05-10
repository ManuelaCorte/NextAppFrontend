<script>

    import { defineComponent } from "vue"
    import CustomClub from "../components/customClub.vue"

    
    export default defineComponent({
    data(){
        return{
            clubs: [] 
        }
    },
    components: { 
        CustomClub
    },
    computed:{
        loadedClubs(){
            return this.$store.getters.getClubs;
        }
    },
    mounted(){
        this.$store.dispatch("clubs"
        ).then(()=>{
            this.clubs = this.loadedClubs
        }).catch(err=>{
            console.log(err)
        })
        
    }
})
</script>

<template>
    <h1 style="text-align: center">Clubs</h1>
    <br>
    <div class="container">
        <div class="row" v-for="club in clubs" :key="club['id']">
            <div class="col"></div>
            <div class="col-12">
                <CustomClub 
                :name="club['name']" 
                :handler="club['handler']"
                :description="club['description']">
                </CustomClub>
            </div>
            <div class="col"></div>
        </div>
    </div>
    
    
</template>

