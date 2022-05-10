 <script>
    

    import { defineComponent} from "vue"
    import { mapMutations } from "vuex";
    
    export default defineComponent({
        data(){
            return{
              email: "",
              password: ""
            }
        },
        methods:{
            ...mapMutations(["setUser", "setToken"]),
            async handleSubmit(){
                /*
                const data= JSON.stringify(this.$data)
                window.localStorage.setItem('inputs', data)
                console.log(JSON.parse(window.localStorage.getItem('inputs') || "{}"))
              */
            
                fetch("http://localhost:3000/login",{
                    method: "POST",
                    headers: {"Content-Type":"application/json"},
                    credentials: "include",
                    body: JSON.stringify(this.$data)
                }).then(response =>{
                    return response.json()
                }).then(data =>{
                    const {token, user} = data
                    this.setUser(user);
                    this.setToken(token);
                    
                }).catch(err=>{
                    console.log(err)
                });
                
                this.$router.push("/")
                }
        }   
        
    });
</script>


<template>
    <main class="form-signin">
        <form @submit.prevent="handleSubmit()">
            <h1 class="h3 mb-3 fw-normal">Please sign up</h1>

            <div class="form-floating">
                <input v-model="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
                <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Password</label>
            </div>

            <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
    </main>
</template>


