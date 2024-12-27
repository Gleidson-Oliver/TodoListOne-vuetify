<template>
  <v-app id="inspire">
    <!-- Drawer com mini-variant -->
    <v-navigation-drawer v-model="drawer" app :width="drawerWidth">
      <div class="d-flex align-center py-3">
        <!-- Ícone de expandir/retrair o drawer -->
        <v-icon size="36" class="icon-close-drawer" @click="toggleMini">
          <!-- Muda o ícone conforme o estado do drawer -->
          {{ mini ? 'mdi-chevron-right' : 'mdi-chevron-left' }}
        </v-icon>
        <v-slide-x-transition leave-absolute>
          <h3 v-if="!mini">Minha lista de tarefas</h3>
        </v-slide-x-transition>
      </div>

      <!-- Lista de usuário -->
      <v-list>
        <v-list-item>
          <template #prepend>
            <v-icon :title="first_name + ' ' + last_name">mdi-account</v-icon>
          </template>
          <v-slide-x-transition leave-absolute>
            <span v-if="!mini" :textContent="first_name + ' ' + last_name"></span>
          </v-slide-x-transition>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <!-- Menu de navegação com ícones e textos -->
      <v-list :lines="false" density="compact" nav>
        <v-list-item
          v-for="(item, i) in items_links"
          :key="i"
          class="pa-2"
          @click="handleItemClick(item)"
        >
          <template v-slot:prepend>
            <v-icon :title="item.name" :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title v-if="!mini" :textContent="item.name"></v-list-item-title>
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
import { ref, computed, onMounted } from 'vue';
import { doc, onSnapshot } from 'firebase/firestore';
import { collectionProfile, auth } from '@/plugins/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter(); // Instância do Vue Router

const items_links = ref([
  { name: "Home", to: "/", icon: "mdi-home" },
  { name: "Perfil", to: "/profile", icon: "mdi-account-cog" },
  { name: "Sair", icon: "mdi-exit-to-app", action: 'logout' }, // Ação de logout
]);

const drawer = ref(true);
const mini = ref(false);

const first_name = ref("");
const last_name = ref("");
const uid = ref("");

const drawerWidth = computed(() => (mini.value ? 80 : 300));

// Alterna entre o modo mini e expandido
const toggleMini = () => {
  mini.value = !mini.value;
};

// Função de logout
const handleLogout = async () => {
  try {
    await signOut(auth); 
    console.log("usuario desautenticado")// Realiza o logout
    router.push('/login'); // Redireciona para a página de login
  } catch (error) {
    console.error('Erro ao deslogar:', error);
  }
};

// Lida com o clique nos itens da lista
const handleItemClick = (item) => {
  if (item.action === 'logout') {
    handleLogout(); // Chama a função de logout
  } else if (item.to) {
    router.push(item.to); // Redireciona para a rota especificada
  }
};

// Obtém informações do usuário no Firebase
onMounted(() => {
  if (auth.currentUser) {
    uid.value = auth.currentUser.uid;

    const userDocRef = doc(collectionProfile, uid.value);

    try {
      onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          first_name.value = userData.first_name || "";
          last_name.value = userData.last_name || "";
        } else {
          alert("Por favor, clique na opção perfil e adicione seu nome e sobrenome.");
        }
      });
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    }
  }
});
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
  