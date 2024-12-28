import {NgOptimizedImage} from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ResourceStatus,
  signal,
} from '@angular/core'
import {rxResource} from '@angular/core/rxjs-interop'
import {MatAnchor} from '@angular/material/button'
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card'
import {MatFormField, MatLabel} from '@angular/material/form-field'
import {MatPaginator, PageEvent} from '@angular/material/paginator'
import {MatProgressSpinner} from '@angular/material/progress-spinner'
import {MatOption, MatSelect, MatSelectChange} from '@angular/material/select'
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
} from '@angular/material/sidenav'
import {MatToolbar} from '@angular/material/toolbar'
import {RouterLink, RouterLinkActive} from '@angular/router'
import {TranslatePipe} from '@ngx-translate/core'
import {tap} from 'rxjs'

import {APP_CONFIG} from '../../config'
import {SortBy, SortOrder} from '../../models'
import {SnackbarService} from '../../services/snackbar.service'
import {StorageService} from '../../services/storage.service'
import {TripsService} from '../../services/trips.service'
import {catchServerError} from '../../shared/errors'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
  imports: [
    TranslatePipe,
    MatCard,
    MatCardHeader,
    MatCardImage,
    NgOptimizedImage,
    MatCardTitle,
    MatCardSubtitle,
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent,
    MatPaginator,
    MatProgressSpinner,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatToolbar,
    MatCardActions,
    RouterLink,
    RouterLinkActive,
    MatAnchor,
  ],
})
export class TripsComponent {
  readonly config = inject(APP_CONFIG)
  readonly tripsService = inject(TripsService)
  readonly snackbarService = inject(SnackbarService)
  readonly storageService = inject(StorageService)

  readonly hidePageSize = this.config.paginator.hidePageSize
  readonly showPageSizeOptions = this.config.paginator.showPageSizeOptions
  readonly showFirstLastButtons = this.config.paginator.showFirstLastButtons
  readonly disabled = this.config.paginator.disabled
  readonly pageSizeOptions = this.config.paginator.pageSizeOptions
  readonly sortByOptions = this.config.paginator.sortByOptions
  readonly sortOrderOptions = this.config.paginator.sortOrderOptions

  readonly sortOptions = this.sortByOptions.reduce<`${SortBy}.${SortOrder}`[]>(
    (acc, sortBy) => {
      this.sortOrderOptions.forEach(sortOrder => {
        acc.push(`${sortBy}.${sortOrder}`)
      })
      return acc
    },
    []
  )

  readonly pageSize = signal(
    this.storageService.pageSize || this.pageSizeOptions[0]
  )
  readonly pageIndex = signal(this.storageService.pageIndex || 0)
  readonly length = signal(0)
  readonly sortBy = signal<SortBy>(this.storageService.sortBy || 'rating')
  readonly sortOrder = signal<SortOrder>(
    this.storageService.sortOrder || 'DESC'
  )
  readonly selectedSort = computed(() => `${this.sortBy()}.${this.sortOrder()}`)

  readonly trips = rxResource({
    request: () => ({
      page: this.pageIndex(),
      limit: this.pageSize(),
      sortBy: this.sortBy(),
      sortOrder: this.sortOrder(),
    }),
    loader: ({request}) =>
      this.tripsService.getTrips(request).pipe(
        catchServerError(() => this.snackbarService.error()),
        tap(res => {
          this.length.set(res.total)
        })
      ),
  })

  handlePageEvent(event: PageEvent) {
    const {pageSize, pageIndex} = event
    this.pageSize.set(pageSize)
    this.pageIndex.set(pageIndex)
    this.storageService.pageSize = pageSize
    this.storageService.pageIndex = pageIndex
  }

  handleSortChange(event: MatSelectChange) {
    const [sortBy, sortOrder] = event.value.split('.') as [SortBy, SortOrder]
    this.sortBy.set(sortBy)
    this.sortOrder.set(sortOrder)
    this.storageService.sortBy = sortBy
    this.storageService.sortOrder = sortOrder
  }

  protected readonly ResourceStatus = ResourceStatus
}
