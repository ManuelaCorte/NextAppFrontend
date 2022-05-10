<script>
import { defineComponent } from "vue";

    export default defineComponent({
        props:{
            id: Number,
            title: String,
            club: Number,
            body: String
        }
    })
</script>

<template>
    <div class="row">
        <div class="col">
            <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static border">
                    <strong class="d-inline-block mb-2 text-primary">{{club}}</strong>
                    <h3 class="mb-2"><strong>{{title}}</strong></h3>
                    <p class="card-text mb-auto">{{body}}</p>
                </div>
                <div class="col-auto d-none d-lg-block">
                <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                    <image width="100%" height="100%" href="../assets/icon.png"></image>
                </svg>
                    <!--<img src="../assets/icon.png" class="img-thumbnail" width="30%" height="100%">-->
                </div>
            </div>
        </div>
    </div>

</template>
