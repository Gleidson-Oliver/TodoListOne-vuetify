<template>
 
    <!-- Conteúdo principal -->
      <v-container >
        <div class="d-flex justify-center">
          <h1>Meu Perfil</h1>
        </div>
        <v-form>
          <v-text-field :firstname_user="name" v-model="first_name" label="Nome"></v-text-field>
          <v-text-field :lastname_user="last_name"  v-model="last_name" label="Sobrenome"></v-text-field>
          <v-btn color="primary">Salvar</v-btn>
        </v-form>
      </v-container>

</template>

<script setup>

import { ref } from 'vue'


const first_name = ref("")
const last_name = ref("")

</script>

<style>

</style>