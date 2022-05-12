<script>
import { defineComponent } from "vue";
import CustomNews from "@/components/customNews.vue";
export default defineComponent({
    data() {
        return {
            reservations: [],
            chosenReservation: 0,
            news: [],
            clubs: [],
            showNews: true
        }
    },
    computed: {
        user() {
            return this.$store.getters.getUser
        },
        userReservations() {
            return this.$store.getters.getUserReservations
        },
        userClubs() {
            return this.$store.getters.getUserClubs
        },
        loadedNews() {
            return this.$store.getters.getNews
        }
    },
    mounted() {
        this.$store.dispatch("userReservations", this.user.id
        ).then(() => {
            this.reservations = this.userReservations
        }).catch(err => {
            console.log(err)
        })

        this.$store.dispatch("userClubs", this.user.id
        ).then(() => {
            this.clubs = this.userClubs
            //console.log(this.clubs)
        }).catch(err => {
            console.log(err)
        })
        this.$store.dispatch("news"
        ).then(() => {
            this.clubs.forEach(club => {
                this.loadedNews.forEach(news => {
                    if (news.club == club.id) {
                        this.news.push(news)
                    }
                })
            });
            //console.log(this.news)
        }).catch(err => {
            console.log(err)
        })


    },
    components: {
        CustomNews
    },
    methods: {
        deleteReservation(reservationId) {
            this.$store.dispatch("deleteUserReservation", reservationId
            ).then(() => {
                this.reservations = this.userReservations
                const index = this.reservations.findIndex(reservation => reservation.id === reservationId)
                if (~index) {
                    this.reservations.splice(index, 1)
                }
                document.getElementById("confirm").hide()
            }).catch(err => {
                console.log(err)
            })
        }
    }
})


</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1>My reservations</h1>
                <table class="table table-striped table-responsive text-center">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Date</th>
                            <th scope="col">Room</th>
                            <th scope="col">Slot</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(reservation, i) in reservations" :key="reservation.id">
                            <th scope="row">{{ i + 1 }}</th>
                            <td> {{ reservation.date }} </td>
                            <td> {{ reservation.room }} </td>
                            <td> {{ reservation.slot }} </td>
                            <td><button class="btn btn-primary align-end" data-bs-toggle="modal" data-bs-target="#confirm" 
                                @click="()=> this.$data.chosenReservation = reservation.id"> Delete reservation </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <h1> Clubs events and news</h1>
                <br>
                <div class="text-center">
                    <a href="#" @click="showNews = true"> News </a> |
                    <a href="#" @click="showNews = false"> Events </a>
                </div>

                <br><br>
                <div v-if="showNews">
                    <div v-for="item in news" :key="item.id">
                        <CustomNews :id=item.id :title=item.title :club=item.club :body=item.body> </CustomNews>
                    </div>
                </div>
                <div v-else>
                    <p>Events</p>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="confirm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Confirm choise</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Are you sure you want to delete this reservation?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                    <button type="button" class="btn btn-primary"
                        @click="deleteReservation(chosenReservation)">Yes</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
a,
a:hover,
a:active,
a:visited,
a:link {
    font-weight: bold;
    text-decoration: none;
    border-radius: 6px;
    border-color: red;
    border: solid;
    padding: 10px;
    color: white;
    background-color: red;
}
</style>