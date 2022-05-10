<script>

import { defineComponent } from "vue"
    export default defineComponent({
        props:{
            id: Number,
            name: String,
            handler: String,
            description: String
        }
    })
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-3">
                <img src="../assets/icon.png" class="img-thumbnail">
            </div>
            <div class="col-9">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <h1>{{name}}</h1>
                        </div>
                    </div>
                    <div class="row align-item-start">
                        <div class="col-4">
                            <h4>{{handler}}</h4>
                        </div>
                    </div>
                    <div class="row align-item-start">
                        <div class="col">
                            <p>{{description}}</p>
                        </div>
                    </div>
                    <div class="row justify-content-end">
                        <div class="col">
                            <button class="btn btn-primary"> Add to your clubs</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>