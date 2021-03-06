import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    status: "",
    user: JSON.parse(localStorage.getItem("user") || "{}"),
    token: localStorage.getItem("token") || "",
    clubs: [],
    news: [],
    rooms: [],
    users: [],
    reservations: [],
    userReservations: [],
    userClubs: [],
    clubNews: []
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token
    },
    getUser(state) {
      return state.user
    },
    getAuthStatus(state) {
      return state.status
    },
    getClubs(state) {
      return state.clubs
    },
    getNews(state) {
      return state.news
    },
    getNewsClub(state, newId) {
      return state.news[newId]
    },
    getRooms(state) {
      return state.rooms
    },
    getRoomInfo: (state) => (roomId) => {
      return state.rooms[roomId]
    },
    getReservations(state) {
      return state.reservations
    },
    getUserReservations(state) {
      return state.userReservations
    },
    getUserClubs(state) {
      return state.userClubs
    },
    getUsers(state) {
      return state.users
    }
  },
  mutations: {
    setLogin(state, { token, user }) {
      state.status = "successfully logged in"
      state.token = token
      state.user = user
    },
    setError(state) {
      state.status = 'error'
    },
    setLogout(state) {
      state.status = 'successfully logged out'
      state.token = ''
      state.user = {}
    },
    setClubs(state, clubs) {
      state.clubs = clubs
    },
    setNews(state, news) {
      state.news = news
      //TODO: fix if clause
      if (state.clubs.len === 0) {
        for (const i in news) {
          let clubId = state.news[i].club
          state.news[i].club = state.clubs[clubId].name
        }
      }
    },
    setRooms(state, rooms) {
      state.rooms = rooms
    },
    setRoomInfo(state, room) {
      state.rooms[room.id] = room
    },
    setReservations(state, reservations) {
      state.reservations = reservations
    },
    setUserReservations(state, reservations) {
      state.userReservations = reservations
    },
    setUserClubs(state, clubs) {
      state.userClubs = clubs
    },
    setUsers(state, users) {
      state.users = users
    }

  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios.post("http://localhost:3000/login", {
          email: user.email,
          password: user.password
        }).then(response => {
          const token = response.data.accessToken
          const user = response.data.user
          //console.log(user)
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(user))

          commit('setLogin', { token, user })
          resolve(response)
        }).catch(err => {
          commit('setError')
          localStorage.removeItem('token')

          reject(err)

        })
      })
    },

    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        console.log(user)
        axios.post("http://localhost:3000/users", {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          password: user.password
        }).then(response => {
          console.log("User added")

          resolve(response)
        }).catch(err => {

          commit('setError')
          localStorage.removeItem('token')

          reject(err)
        })
      })
    },

    logout({ commit }) {
      return new Promise((resolve) => {
        commit("setLogout")
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },

    clubs({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get("http://localhost:3000/clubs"
        ).then(response => {
          const clubs = response.data
          commit('setClubs', clubs)
          resolve(response)
        }).catch(err => {
          commit('setError')

          reject(err)
        })
      })
    },

    news({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get("http://localhost:3000/news"
        ).then(response => {
          const news = response.data
          commit('setNews', news)

          resolve(response)
        }).catch(err => {

          commit('setError')

          reject(err)
        })
      })
    },

    rooms({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get("http://localhost:3000/rooms"
        ).then(response => {
          const rooms = response.data
          commit('setRooms', rooms)

          resolve(response)
        }).catch(err => {

          commit('setError')

          reject(err)
        })
      })
    },

    roomDetail({ commit }, roomId) {
      return new Promise((resolve, reject) => {
        axios.get("http://localhost:3000/rooms/" + roomId
        ).then(response => {
          const room = response.data
          commit("setRoomInfo", room)
          resolve(response)
        }).catch(err => {
          commit("setError")
          reject(err)
        })
      })
    },

    bookRoom({ commit }, reservation) {
      return new Promise((resolve, reject) => {
        axios.post("http://localhost:3000/reservations", {
          id: reservation.id,
          user: reservation.user,
          room: reservation.room,
          slot: reservation.slot,
          date: reservation.date
        }).then(response => {
          resolve(response)
        }).catch(err => {
          commit('setError')
          reject(err)
        })
      })
    },

    userReservations({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios.get("http://localhost:3000/reservations"
        ).then(response => {
          let filteredReservations = [];
          response.data.forEach(function (item) {
            if (item.user === user) {
              filteredReservations.push(item);
            }
          });
          commit("setUserReservations", filteredReservations)
          resolve(response)
        }).catch(err => {
          commit("setError")
          reject(err)
        })
      })
    },

    userClubs({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios.get("http://localhost:3000/clubs"
        ).then(response => {
          let filteredClubs = [];
          response.data.forEach(function (club) {
            club.subscribers.forEach(function (id) {
              if (user === id) {
                filteredClubs.push(club);
              }
            })
          });
          commit("setUserClubs", filteredClubs)
          resolve(response)
        }).catch(err => {
          commit("setError")
          reject(err)
        })
      })
    },

    deleteUserReservation({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios.delete("http://localhost:3000/reservations/" + id
        ).then(response => {
          //commit("setReservations")
          resolve(response)
        }).catch(err => {
          commit("setError")
          reject(err)
        })
      })
    },

    users({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get("http://localhost:3000/users"
        ).then(response => {
          let users = response.data
          users.forEach(user =>{
            delete user.password
          })
          commit('setUsers', users)
          resolve(response)
        }).catch(err => {
          commit('setError')
          reject(err)
        })
      })
    },

    deleteUser({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios.delete("http://localhost:3000/users/" + id
        ).then(response => {
          console.log("User successfully deleted")
          resolve(response)
        }).catch(err => {
          commit("setError")
          reject(err)
        })
      })
    },

    modifyUser({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios.patch("http://localhost:3000/users/" + user.id, user
        ).then(response => {
          console.log("User updated")
          resolve(response)
        }).catch(err => {
          commit("setError")
          reject(err)
        })
      })
    },

    addRoom({commit}, room){
      return new Promise((resolve, reject)=>{
        axios.post("http://localhost:3000/rooms", room
        ).then(response=>{
          resolve(response)
        }).catch(err=>{
          commit("setError")
          reject(err)
        })
     })
    },


  },
  modules: {
  }
})
