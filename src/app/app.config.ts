import {HttpClient, provideHttpClient} from '@angular/common/http'
import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core'
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async'
import {provideRouter} from '@angular/router'
import {provideTranslateService, TranslateLoader} from '@ngx-translate/core'
import {TranslateHttpLoader} from '@ngx-translate/http-loader'

import {routes} from './app.routes'
import {config, provideAppConfig} from './config'

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (
  http: HttpClient
) => new TranslateHttpLoader(http, './i18n/', '.json')

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideTranslateService({
      defaultLanguage: config.localization.defaultLanguage,
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    provideAppConfig(),
  ],
}
