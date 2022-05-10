<script>
    
    import { defineComponent } from "vue";

    export default defineComponent({

        data(){
            return{
                rooms:[],   
                seated: 15
            }
        },
        computed:{
            loadedRooms(){
                return this.$store.getters.getRooms
            }
        },
        mounted(){
            this.$store.dispatch("rooms"
            ).then(()=>{
                this.rooms = this.loadedRooms
            }).catch(err=>{
                console.log(err)
            })  
        }
    })
</script>

<template>
    <h1>Reserve room</h1>
    <br>   
    <div class="container">
        <div class="row border align-items-center" v-for="room in rooms" :key="room['id']">
            <div class="col">
                <h1>{{room['name']}}</h1>
            </div>
            <div class="col">
                <!--<router-link :to="{name:'room', params:{id: room['id']}}">
                
                </router-link>-->
                <button class="btn btn-primary" v-if="seated < room['total_seat']"
                @click="$router.push({name:'room', params:{id: room['id']}})">
                    Click here to book
                </button>
                <p v-else> The room is already fully booked</p>
            </div>
        </div>
    </div>
</template>