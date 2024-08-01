import { Page } from '@/components/Page/Page';
import { Link } from '@/components/Link/Link';
import { DisplayData } from '@/components/DisplayData/DisplayData';
import { PageComponent } from '@/pages/PageComponent';
import type { AppContext } from '@/context/types';

export class LaunchParamsPage extends PageComponent {
  constructor(context: AppContext) {
    super(new Page({ title: 'Launch Params' }));
    const { platform, version, initDataUnsafe } = context.getWebApp();
    this
      .page
      .setDisclaimer([
        'This page displays application ',
        new Link({
          href: 'https://docs.telegram-mini-apps.com/platform/launch-parameters',
        }, context)
          .appendChild('launch parameters')
          .element(),
        '.',
      ])
      .appendChild(
        new DisplayData({
          rows: [
            { title: 'tgWebAppPlatform', value: platform },
            { title: 'tgWebAppVersion', value: version },
            { title: 'tgWebAppStartParam', value: initDataUnsafe?.start_param },
            {
              title: 'tgWebAppData',
              value: new Link({ href: '/init-data' }, context)
                .appendChild('View')
                .element(),
            },
            {
              title: 'tgWebAppThemeParams',
              value: new Link({ href: '/theme-params' }, context)
                .appendChild('View')
                .element(),
            }],
        }).element(),
      );
  }
}