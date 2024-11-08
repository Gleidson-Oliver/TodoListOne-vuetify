// router/index.ts

import { createRouter, createWebHistory } from 'vue-router/auto';
import { setupLayouts } from 'virtual:generated-layouts';
import { routes } from 'vue-router/auto-routes';
import { auth } from '../plugins/firebase'; // Importação direta do `auth`

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
});

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    to.meta = { requiredAuth: true };
  }

  if ( to.meta.requiredAuth && !auth.currentUser) {
    next({ name: '/login' });
  } else {
    next();
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
