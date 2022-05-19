<script>
import { defineComponent } from "vue";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";

export default defineComponent({
    components: {
        Datepicker,
        CircleProgress
    },
    data() {
        return {
            rooms: [],
            reservationRoom: [],
            seated: 15,
            date: new Date(),
            showRooms: false,
            showSlots: false,
            minDate: "",
            maxDate: ""
        }
    },
    computed: {
        loadedRooms() {
            return this.$store.getters.getRooms
        },
        user() {
            return this.$store.getters.getUser
        },
        userReservations(){
            return this.$store.getters.getUserReservations
        }
    },
    mounted() {
        this.$store.dispatch("rooms"
        ).then(() => {
            this.rooms = this.loadedRooms
        }).catch(err => {
            console.log(err)
        })

    },
    methods: {
        handleDate(modelData) {
            this.date.value = modelData
            this.date.value = "" + this.date.getDate() + "/" + (this.date.getMonth() + 1) + "/" + this.date.getFullYear()
            this.showRooms = true
        },

        chooseRoom(roomId) {
            this.reservationRoom = this.rooms[roomId]
            this.showSlots = true
        },

        /* TODO
            if user already has booked for that slot the they can't reserve it again
        */
        handleBooking(roomId, slot) {
            console.log(slot)
            let reservation = {
                id: Math.floor(Math.random() * 100),
                user: this.user.id,
                room: roomId,
                slot: slot,
                date: this.date.value
            }
            this.$store.dispatch("bookRoom", reservation
            ).then(() => {
                console.log("Slot correctly booked")
            }).catch(err => {
                console.log(err)
            })
        }


    },
    created() {
        this.minDate = new Date()
        this.maxDate = new Date(new Date().setDate(this.minDate.getDate() + 30));
    }

})
</script>

<template>
    <h1>Reserve room</h1>
    <br>
    <div class="container">
        <div class="row">
            <div class="col">
                <h3 class="text.start"> Please select a date:</h3>
            </div>
        </div>
        <div class="row">
            <div class="col"></div>
            <div class="col">
                <Datepicker v-model="date" inline placeholder="Select date" :cleareble="true"
                    @update:modelValue="handleDate" :minDate="minDate" :maxDate="maxDate" :enableTimePicker="false" />
            </div>
            <div class="col"></div>
        </div>
        <div class="row">
            <div class="col"> <br><br></div>
        </div>

        <div v-if="this.showRooms">
            <p> Select room for date: {{ date.value }}</p>
            <div class="row border align-items-center" v-for="room in rooms" :key="room.id">
                <div class="col">
                    <h1>{{ room.name }}</h1>
                </div>
                <div class="col">
                    <button class="btn btn-primary" v-if="seated < room.total_seat" @click="chooseRoom(room.id)">
                        Click here to book
                    </button>
                    <p v-else> The room is already fully booked</p>
                </div>
            </div>
        </div>

        <div class="row" v-if="showSlots">
            <div class="col">
                <h3> Available slots for: {{ date.value }}</h3>
            </div>
        </div>
        <div class="row">
            <div class="col"> <br><br></div>
        </div>
        <div class="row" v-if="showSlots">
            <div class="col">
                <div class="container gap-3">
                    <div class="row align-items-center" v-for="slot in this.reservationRoom.reservations.slots" :key="slot.id">
                        <div class="col-6 text-center">
                            <h3 class="text-center"> {{ slot.start }}-{{ slot.end }}</h3>
                        </div>
                        <div class="col-3 d-flex justify-content-center">
                            <div v-if="slot.emptySeats > 0">
                                <button class="btn btn-primary" @click="handleBooking(reservationRoom.id, slot.id)">
                                    Book for this slot
                                </button>
                            </div>
                            <div v-else>
                                <p> Slots already fully booked</p>
                            </div>
                        </div>
                        <div class="col-3 d-flex justify-content-center">
                            <circle-progress :percent="((reservationRoom.total_seat - slot.emptySeats) / reservationRoom.total_seat) * 100"
                                :size="90" :viewport="true" :is-gradient="true" :gradient="{
                                    angle: 90,
                                    startColor: '#ff0000',
                                    stopColor: '#ff0000'
                                }"></circle-progress>
                        </div>
                        <div class="row"><br></div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<style>
.dp__theme_light {
    --dp-background-color: #ffffff;
    --dp-text-color: #212121;
    --dp-hover-color: #ff6f60;
    --dp-hover-text-color: #212121;
    --dp-hover-icon-color: #959595;
    --dp-primary-color: red;
    --dp-primary-text-color: #f8f5f5;
    --dp-secondary-color: #c0c4cc;
    --dp-border-color: #ddd;
    --dp-menu-border-color: #ddd;
    --dp-border-color-hover: #aaaeb7;
    --dp-disabled-color: #f6f6f6;
    --dp-scroll-bar-background: #f3f3f3;
    --dp-scroll-bar-color: #959595;
    --dp-success-color: red;
    --dp-success-color-disabled: #red;
    --dp-icon-color: #959595;
    --dp-danger-color: #ff6f60;
}
</style>