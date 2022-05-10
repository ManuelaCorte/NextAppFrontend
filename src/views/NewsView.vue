<script>

    import { defineComponent } from "vue"
    import CustomNews from "../components/customNews.vue"

    
    export default defineComponent({
    data(){
        return{
            news: []
        }
    },
    components: { 
        CustomNews
    },
    computed:{
        loadedNews(){
            return this.$store.getters.getNews
        }
    },
    mounted(){
        this.$store.dispatch("news"
        ).then(()=>{
            this.news = this.loadedNews

        }).catch(err=>{
            console.log(err)
        })  
    }
})
</script>

<template>
    <h1 style="text-align: center">News</h1>
    <br>
    <div class="container">
        <div class="row" v-for="article in news" :key="article['id']">
            <div class="col"></div>
            <div class="col-12">
                <CustomNews
                :title="article['title']" 
                :club="article['club']"
                :date="article['date']"
                :body="article['body']">
                </CustomNews>
            </div>
            <div class="col"></div>
        </div>
    </div>
    
    
</template>