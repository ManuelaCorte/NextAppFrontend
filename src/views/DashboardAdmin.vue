<script>
import { defineComponent } from "vue"
import UsersManagement from "@/components/UsersManagement.vue"
import RoomsManagement from "@/components/RoomsManagement.vue"

export default defineComponent({
    data(){
        return{
            showUsers: false,
            showRooms: false,
            showClubs: false,
            showGeneral: false,
        }
    },
    methods:{
        toggleUsers(){
            this.showUsers = !this.showUsers
            this.showRooms = false
            this.showClubs = false
            this.showGeneral = false
        },
        toggleRooms(){
            this.showRooms = !this.showRooms
            this.showUsers = false
            this.showClubs = false
            this.showGeneral = false
        },
        toggleClubs(){
            this.showClubs = !this.showClubs
            this.showRooms = false
            this.showUsers = false
            this.showGeneral = false
        },
        toggleGeneral(){
            this.showGeneral = !this.showGeneral
            this.showRooms = false
            this.showClubs = false
            this.showUsers = false
        }
    },
    components:{
        UsersManagement, 
        RoomsManagement
    }
})
</script>

<template>
<div class="container">
    <div class="row my-4">
        <div class="col-12 col-md-6 col-lg-3 mb-4 mb-lg-0">
            <div class="card h-100">
                <h5 class="card-header text-center">Users</h5>
                <div class="card-body h-100">
                    <h5 class="card-text">From here you'll be able to add, delete and modify users and their information</h5>
                    <div class="text-center">
                       <button class="btn btn-primary" @click="toggleUsers()"> Manage users </button> 
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6 mb-4 mb-lg-0 col-lg-3">
            <div class="card h-100">
                <h5 class="card-header text-center">Clubs</h5>
                <div class="card-body h-100">
                    <h5 class="card-text">From here you'll be able to add, delete and modify clubs and their events</h5>
                    <div class="text-center">
                       <button class="btn btn-primary" @click="toggleClubs()"> Manage clubs </button> 
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6 mb-4 mb-lg-0 col-lg-3">
            <div class="card h-100">
                <h5 class="card-header text-center">Rooms</h5>
                <div class="card-body">
                    <h5 class="card-text">From here you'll be able to add, delete and modify rooms</h5>
                    <div class="text-center">
                       <button class="btn btn-primary" @click="toggleRooms()"> Manage rooms </button> 
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6 mb-4 mb-lg-0 col-lg-3">
            <div class="card h-100">
                <h5 class="card-header text-center">General channel</h5>
                <div class="card-body">
                    <h5 class="card-text">From here you'll be able to add, delete and modify news in the general channel</h5>
                    <div class="text-center">
                       <button class="btn btn-primary" @click="toggleGeneral()"> Manage general channel </button> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<UsersManagement v-if="showUsers"></UsersManagement>
<RoomsManagement v-if="showRooms"></RoomsManagement>
</template>

<style>
</style>