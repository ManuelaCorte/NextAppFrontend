<script>
  export default {
      computed: {
      isLoggedIn() {
        return this.$store.getters.isLoggedIn;
      },
      authStatus(){
        return this.$store.getters.getAuthStatus;
      }
    },
    methods:{
        logout(){
          this.$store.dispatch("logout"
          ).then(()=>{
            this.$router.push("/")
            console.log(this.authStatus)
          }).catch(err=>{
            console.log(err)
          })
        }
      }
  }
</script>
<template>
  
  
  <nav v-if="isLoggedIn" class="navbar navbar-dark fixed-top bg-dark">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">NextApp</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample01"  aria-expanded="false" >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarsExample01">
        <ul class="navbar-nav me-auto mb-2">
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link active">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/clubs" class="nav-link active">Clubs</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/news" class="nav-link active">News</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/rooms" class="nav-link active">Rooms</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-bs-toggle="dropdown" aria-expanded="false">Profile</a>
            <ul class="dropdown-menu" aria-labelledby="dropdown01">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" @click="logout()">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <nav v-else class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
  <div class="container-fluid">
    <router-link to="/" class="navbar-brand">NextApp</router-link>
    <router-link to="/login"> <button class="btn btn-primary">Log In</button> </router-link>
  </div>
</nav>
  
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}


body {
  min-height: 75rem;
  padding-top: 4.5rem;
}
.btn-primary,
  .btn-primary:hover,
  .btn-primary:active,
  .btn-primary:visited,
  .btn-primary:focus {
      background-color: red !important;
      border-color: red !important;
  }
.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255,0,0, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E") !important; 
}

.navbar-toggler {
  border-color: red !important;
}


</style>