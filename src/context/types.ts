import type { WebApp } from '@twa-dev/types';
import { TonConnectUI } from '@tonconnect/ui';

export interface AppContext {
  getWebApp(): WebApp;
  tonConnectUI: TonConnectUI;
}