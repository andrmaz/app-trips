import {Injectable} from '@angular/core'

import {SortBy, SortOrder} from '../models'

@Injectable({providedIn: 'root'})
export class StorageService {
  private static SORT_BY_KEY = 'SORT_BY'
  private static SORT_ORDER_KEY = 'SORT_ORDER'
  private static PAGE_SIZE_KEY = 'PAGE_SIZE'
  private static PAGE_INDEX_KEY = 'PAGE_INDEX'

  get sortBy(): SortBy | null {
    return window.localStorage.getItem(
      StorageService.SORT_BY_KEY
    ) as SortBy | null
  }

  set sortBy(sortBy: SortBy) {
    window.localStorage.setItem(StorageService.SORT_BY_KEY, sortBy)
  }

  get sortOrder(): SortOrder | null {
    return window.localStorage.getItem(
      StorageService.SORT_ORDER_KEY
    ) as SortOrder | null
  }

  set sortOrder(sortOrder: SortOrder) {
    window.localStorage.setItem(StorageService.SORT_ORDER_KEY, sortOrder)
  }

  get pageSize(): number | null {
    const pageSize = window.localStorage.getItem(StorageService.PAGE_SIZE_KEY)
    return pageSize ? Number(pageSize) : null
  }

  set pageSize(pageSize: number) {
    window.localStorage.setItem(
      StorageService.PAGE_SIZE_KEY,
      JSON.stringify(pageSize)
    )
  }

  get pageIndex(): number | null {
    const pageIndex = window.localStorage.getItem(StorageService.PAGE_INDEX_KEY)
    return pageIndex ? Number(pageIndex) : null
  }

  set pageIndex(pageIndex: number) {
    window.localStorage.setItem(
      StorageService.PAGE_INDEX_KEY,
      JSON.stringify(pageIndex)
    )
  }
}
