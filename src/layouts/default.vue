<template>
  <v-app id="inspire">
    <!-- Drawer com mini-variant -->
    <v-navigation-drawer
      v-model="drawer"
      v-model:mini-variant.sync="mini"
      app
      :width="drawerWidth"
    >
      <div class="d-flex align-center py-3">
        <!-- Ícone de expandir/retrair o drawer -->

            <v-icon
              size="36"
              class="icon-close-drawer"
              @click="toggleMini"
            >
              <!-- Muda o ícone conforme o estado do drawer -->
              {{ mini ? 'mdi-chevron-right' : 'mdi-chevron-left' }}
            </v-icon>
            <v-slide-x-transition leave-absolute >
               <h3 v-if="!mini">Minha lista de tarefas</h3>
        </v-slide-x-transition>
      </div>

      <!-- Lista de usuário -->
      <v-list>
        <v-list-item>
          <template #prepend>
            <v-icon title="usuário: Gleidson Oliveir">mdi-account</v-icon>
          </template>
          <v-slide-x-transition leave-absolute>
            <span v-if="!mini">Gleidson Oliveir</span>
          </v-slide-x-transition>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <!-- Menu de navegação com ícones e textos -->
      
      <v-list
          :lines="false"
          density="compact"
          nav
        >
          <v-list-item
            v-for="(item, i) in items_links"
            :key="i"
            :value="item"
            color="primary"
            :to="item.to"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>

            <v-list-item-title :textContent="item.name"></v-list-item-title>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <!-- Barra do app -->
    <v-app-bar color="primary" elevation="1">
      <v-app-bar-title>Lista de tarefas</v-app-bar-title>
    </v-app-bar>

    <!-- Conteúdo principal -->
    <v-main>
      <router-view></router-view>
    </v-main>

    <!-- Rodapé -->
    <v-footer app class="py-3" color="primary">
      <span>TodoList &copy; 2024</span>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'

const items_links = ref([
  {name:"Home", to:"/", icon:"mdi-home"},
  {name:"Perfil", to:"/profile", icon:"mdi-account-cog"},

  
])
// Controle do drawer (aberto ou fechado)
const drawer = ref(true)
// Controle do mini-variant (minimizado ou expandido)
const mini = ref(false)

const drawerWidth = computed(() => (
  mini.value ? 80 : 300
))

// Alterna entre o modo mini e expandido
const toggleMini = () => {
  mini.value = !mini.value
}
</script>

<style scoped>

  a, li, p {
    text-decoration: none;
    list-style: none;
    padding: 0;
    margin:0;

  }
  a{
    color:inherit;
  }

 
.icon-close-drawer {
  cursor: pointer;
}

</style>
