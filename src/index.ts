import { type RoutePage, routes } from '@/navigation/routes';
import { initTonConnectUI } from '@/initTonConnectUI';
import { getWebApp } from '@/utils/getWebApp';
import type { AppContext } from '@/context/types.js';

import './index.css';

const tonConnectUI = initTonConnectUI();

const appContext: AppContext = {
  tonConnectUI,
  getWebApp,
};

const webApp = getWebApp();
const root = document.getElementById('root')!;
let prevPage: RoutePage;

// Launch eruda and enable SDK debug mode, if debug mode was requested outside.
const debug = webApp.initDataUnsafe.start_param === 'debug';
if (debug) {
  import('eruda').then((lib) => lib.default.init());
}

webApp.BackButton.onClick(goBack);

window.addEventListener('hashchange', () => {
  const path = window.location.hash.slice(1);
  renderCurrentRoute(path);
  updateBackButton(path)
})

renderCurrentRoute(window.location.hash.slice(1));

function renderCurrentRoute(path: string) {
  const route = routes.find(r => r.pathname === path);
  if (!route) {
    window.location.hash = '#/';
    return;
  }
  prevPage && prevPage.destroy && prevPage.destroy();
  prevPage = new route.Page(appContext);
  prevPage.init && prevPage.init();
  prevPage.render(root);
}

function goBack() {
  window.history.go(-1);
}

function updateBackButton(path: string) {
  if (path === '/') {
    webApp.BackButton.isVisible && webApp.BackButton.hide();
  } else {
    !webApp.BackButton.isVisible && webApp.BackButton.show();
  }
}