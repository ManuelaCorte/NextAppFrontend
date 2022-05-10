<script>

import { defineComponent } from "vue"

    export default defineComponent({
        data(){
            return {
                name: "",
                email: "",
                password: ""
            }
        },
        methods:{
            handleSubmit(){
                let id = Math.floor(Math.random()*100)
                let name = this.name
                let email = this.email
                let password = this.password
                this.$store.dispatch("register",{
                    id,
                    name,
                    email,
                    password
                }).then(()=>{
                    this.$router.push("/login")
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
            <input v-model="email" type="email" class="form-control" id="floatingMail" placeholder="name@example.com">
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="name" type="text" class="form-control" id="floatingName" placeholder="name">
            <label for="floatingInput">Name</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
            <label for="floatingPassword">Password</label>
          </div>
          <div class="mb-3">
            <label class="form-label" for="customFile">Upload profile picture</label>
            <input type="file" class="form-control" id="customFile">
          </div>
          <button class="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style>

body {
  height: 100%;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>