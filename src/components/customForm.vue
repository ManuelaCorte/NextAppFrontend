 <script>
    
    import { defineComponent } from "vue"
    import customInput from "./customInput.vue"
    
    export default defineComponent({
        components:{
            customInput
        },
        data(){
            return{
                title: "Login form",
                inputs:[
                    {
                        label: "Email",
                        type: "text",
                        value: ""    
                    },
                    {
                        label: "Password",
                        type: "password",
                        value: ""    
                    }
                ]
            }
        },
        methods:{
            handleSubmit(){
                const data= JSON.stringify(this.inputs)
                window.localStorage.setItem('inputs', data)
                console.log(JSON.parse(window.localStorage.getItem('inputs') || "{}"))
            }
        }   
        
    });
</script>


<template>
    <h1>{{title}}</h1>
    <br>
    <form class="form-group" @submit.prevent="handleSubmit()">
            <customInput v-for="(input, i) in inputs" v-bind:key="i"
            v-model="input.value" 
            v-bind:label="input.label"
            v-bind:type="input.type"  
            />
        <button class="btn btn-primary btn-lg">Log in</button>
        <br> <br>  
        <nav>
            <router-link to="/register">First time? Click here to sign up</router-link> 
        </nav>
        <router-view/>
    </form>
</template>