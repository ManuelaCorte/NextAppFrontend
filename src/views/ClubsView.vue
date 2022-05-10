<script>

    import { defineComponent } from "vue"
    
    export default defineComponent({
    data(){
        return{
            clubs: [] 
        }
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
        <div class="row">
            <div v-for="club in clubs" :key="club['id']" class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static border">
                    <h3 class="mb-2"> <strong>{{club.name}}</strong></h3>
                    <p class="card-text mb-auto">{{club.description}}</p>
                    <router-link :to="{name:'club', params:{id: club.id}}">Click to see details </router-link>
                </div>
                <div class="col-auto d-none d-lg-block">
                <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                    <image width="100%" height="100%" href="../assets/icon.png"></image>
                </svg>
                </div>
            </div>
            
        </div>
    </div>
    
    
</template>

<style>
    .blog-header {
    line-height: 1;
    border-bottom: 1px solid #e5e5e5;
    }

    .blog-header-logo {
    font-family: "Playfair Display", Georgia, "Times New Roman", serif/*rtl:Amiri, Georgia, "Times New Roman", serif*/;
    font-size: 2.25rem;
    }

    .blog-header-logo:hover {
    text-decoration: none;
    }

    h1, h2, h3, h4, h5, h6 {
    font-family: "Playfair Display", Georgia, "Times New Roman", serif/*rtl:Amiri, Georgia, "Times New Roman", serif*/;
    }

    .display-4 {
    font-size: 2.5rem;
    }
    @media (min-width: 768px) {
    .display-4 {
        font-size: 3rem;
    }
    }

    .nav-scroller {
    position: relative;
    z-index: 2;
    height: 2.75rem;
    overflow-y: hidden;
    }

    .nav-scroller .nav {
    display: flex;
    flex-wrap: nowrap;
    padding-bottom: 1rem;
    margin-top: -1px;
    overflow-x: auto;
    text-align: center;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    }

    .nav-scroller .nav-link {
    padding-top: .75rem;
    padding-bottom: .75rem;
    font-size: .875rem;
    }

    .card-img-right {
    height: 100%;
    border-radius: 0 3px 3px 0;
    }

    .flex-auto {
    flex: 0 0 auto;
    }

    .h-250 { height: 250px; }
    @media (min-width: 768px) {
    .h-md-250 { height: 250px; }
    }

    /* Pagination */
    .blog-pagination {
    margin-bottom: 4rem;
    }
    .blog-pagination > .btn {
    border-radius: 2rem;
    }

    /*
    * Blog posts
    */
    .blog-post {
    margin-bottom: 4rem;
    }
    .blog-post-title {
    margin-bottom: .25rem;
    font-size: 2.5rem;
    }
    .blog-post-meta {
    margin-bottom: 1.25rem;
    color: #727272;
    }
</style>

