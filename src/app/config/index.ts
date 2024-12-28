import {InjectionToken} from '@angular/core'

export const config = {
  localization: {
    defaultLanguage: 'en',
  },
  paginator: {
    pageSizeOptions: [10, 15],
    hidePageSize: false,
    showPageSizeOptions: true,
    showFirstLastButtons: true,
    disabled: false,
    sortByOptions: ['title', 'price', 'rating', 'createdAt'],
    sortOrderOptions: ['ASC', 'DESC'],
  },
} as const

export const APP_CONFIG = new InjectionToken<typeof config>('app.config')

export function provideAppConfig() {
  return {
    provide: APP_CONFIG,
    useValue: config,
  }
}
