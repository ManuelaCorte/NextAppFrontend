<script>

import { defineComponent } from "vue"

    export default defineComponent({
        data(){
            return {
                username: "",
                email: "",
                password: "",
                firstName: "",
                lastName: "",
            }
        },
        methods:{
            handleSubmit(){
                let id = Math.floor(Math.random()*100)
                let username = this.username
                let email = this.email
                let password = this.password
                let firstName = this.firstName
                let lastName = this.lastName
                this.$store.dispatch("register",{
                    id,
                    username,
                    email,
                    password,
                    firstName,
                    lastName
                }).then(()=>{
                    this.$router.push("/")
                }).catch(err=>{
                    console.log(err)
                })
            }
        } 
    })
</script>

<template>
    <div class="container col-xl-10 col-xxl-8 px-4 py-5">
    <div class="row align-items-center g-lg-5 py-5">
      <div class="col-md-10 mx-auto col-lg-5">
        <form @submit.prevent="handleSubmit()" class="p-4 p-md-5 border rounded-3 bg-light">
          <h1 class="h3 mb-3 fw-normal">Please sign up</h1>
          <div class="form-floating mb-3">
            <input v-model="email" type="email" class="form-control"  placeholder="name@example.com">
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="username" type="text" class="form-control" placeholder="username">
            <label for="floatingInput">Username</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="firstName" type="text" class="form-control" placeholder="firstname">
            <label for="floatingInput">First Name</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="lastName" type="text" class="form-control"  placeholder="lastname">
            <label for="floatingInput">Last Name</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="password" type="password" class="form-control" placeholder="Password">
            <label for="floatingPassword">Password</label>
          </div>
          <button class="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style>


</style>