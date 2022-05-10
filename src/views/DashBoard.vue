<script>
import { defineComponent } from "vue";
import CustomClub from "@/components/customClub.vue";
    export default defineComponent({
        data(){
            return{
                reservations: [],
                news: [],
                clubs: []
            }
        },
        computed:{
            user(){
                return this.$store.getters.getUser
            },
            userReservations(){
                return this.$store.getters.getUserReservations
            },
            userClubs(){
                return this.$store.getters.getUserClubs
            }
        },
        mounted(){
            this.$store.dispatch("userReservations", this.user.id
            ).then(()=>{
                this.reservations = this.userReservations
            }).catch(err=>{
                console.log(err)
            })

            this.$store.dispatch("userClubs", this.user.id
            ).then(()=>{
                this.clubs = this.userClubs
                console.log(this.clubs)
            }).catch(err=>{
                console.log(err)
            })
        },
        components:{
            CustomClub
        },
        methods:{
            deleteReservation(reservationId){
                this.$store.dispatch("deleteUserReservation",reservationId
                ).then(()=>{
                    this.reservations = this.userReservations
                }).catch(err=>{
                    console.log(err)
                })
            }
        }
    })
</script>

<template>
    <p>My reservations</p>
    <p v-for="reservation in reservations" :key="reservation.id">
        Date: {{reservation.date}} 
        Room: {{reservation.room}}
        Slot: {{reservation.slot}}
        <button class="btn btn-primary align-end" @click="deleteReservation(reservation.id)"> Delete reservation</button>
    </p>
    <p> clubs events and news</p>
    <p v-for="club in clubs" :key="club.id">
        <CustomClub
            :id = club.id
            :name = club.name
            :handler = club.handler
            :description = club.description
            :subscribers = club.subscribers
        ></CustomClub>
        
    </p>

</template>