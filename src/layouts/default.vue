<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <v-list dense color="primary" light>
        <v-list-item>
          <v-list-item-actions>
            <v-icon v-show="drawer" @click="drawer = !drawer">mdi-chevron-left</v-icon>
          </v-list-item-actions>
          <v-list-item-title>
            <h3>Minha Lista de tarefas</h3>
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-account</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>Gleidson Oliveira</v-list-item-content>
      </v-list-item>
      <v-divider ></v-divider>
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar color="primary" 
    elevation="1">
      <v-app-bar-nav-icon
       v-show="!drawer" 
       @click="drawer = !drawer" 
     >
      </v-app-bar-nav-icon>

      <v-app-bar-title>Lista de tarefas</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <!--  -->
    </v-main>
    <v-footer app class="py-3" color="primary">
      <span>TodoList &copy;2024</span>
    </v-footer>
  </v-app>
</template>

<script setup>
  import { ref } from 'vue'

  const drawer = ref(null)
</script>

<script>
  export default {
    data: () => ({ drawer: null }),
  }
</script>