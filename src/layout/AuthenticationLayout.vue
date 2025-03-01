<template>
    <div class="authentication">
        <v-container fluid class="container h-100">
            <v-row class="h-100">
                <v-col cols="12" md="6" class="form-col">
                    <slot />
                </v-col>
                <v-col md="6 d-none d-md-flex">
                     <div class="d-flex justify-center align-center">
                        <img src="/src/assets/images/goldbar.png" alt="ورود به خانه طلا" class="login-image">
                     </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup>

</script>

<style scoped>
.authentication {
    background: rgba(254, 253, 251, 1);
    height: 100vh;
}

.container {
    max-width: 1440px;
}

.form-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.login-image{
    max-width:100%;
}
</style>