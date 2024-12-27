import { createRouter, createWebHistory } from 'vue-router/auto';
import { setupLayouts } from 'virtual:generated-layouts';
import { routes } from 'vue-router/auto-routes';
import { auth } from '../plugins/firebase'; // Importação direta do `auth`
import { onAuthStateChanged } from 'firebase/auth'; // Importar para verificar autenticação

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
});

let isAuthChecked = false; // Variável para garantir que a autenticação seja verificada uma vez

router.beforeEach((to, from, next) => {
  // Verificar se a autenticação já foi verificada
  if (!isAuthChecked) {
    // Verificar estado de autenticação de forma assíncrona
    onAuthStateChanged(auth, (user) => {
      isAuthChecked = true; // Marca que a verificação foi feita
      if (to.path !== '/login' && !user) {
        next({ name: '/login' }); // Redireciona para a página de login se não autenticado
      } else {
        next(); // Prossegue com a navegação se o usuário estiver autenticado
      }
    });
  } else {
    // Caso já tenha verificado a autenticação, continue com a navegação
    if (to.path !== '/login' && !auth.currentUser) {
      next({ name: '/login' });
    } else {
      next();
    }
  }
});

// Workaround para o erro de importação dinâmica
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Recarregando a página para corrigir o erro de importação dinâmica');
      localStorage.setItem('vuetify:dynamic-reload', 'true');
      location.assign(to.fullPath);
    } else {
      console.error('Erro de importação dinâmica, recarregar a página não resolveu', err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload');
});

export default router;
