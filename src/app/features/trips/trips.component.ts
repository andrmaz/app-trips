import {NgOptimizedImage} from '@angular/common'
import {
  Component,
  computed,
  inject,
  ResourceStatus,
  signal,
} from '@angular/core'
import {rxResource} from '@angular/core/rxjs-interop'
import {
  MatCard,
  MatCardContent,
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
import {TranslatePipe} from '@ngx-translate/core'
import {tap} from 'rxjs'

import {APP_CONFIG} from '../../config'
import {SortBy, SortOrder} from '../../models'
import {SnackbarService} from '../../services/snackbar.service'
import {TripsService} from '../../services/trips.service'
import {catchServerError} from '../../shared/errors'

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
  imports: [
    TranslatePipe,
    MatCard,
    MatCardHeader,
    MatCardContent,
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
  ],
})
export class TripsComponent {
  readonly config = inject(APP_CONFIG)
  readonly tripsService = inject(TripsService)
  readonly snackbarService = inject(SnackbarService)

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

  readonly pageSize = signal<number>(this.pageSizeOptions[0])
  readonly pageIndex = signal(0)
  readonly length = signal(0)
  readonly sortBy = signal<SortBy>('rating')
  readonly sortOrder = signal<SortOrder>('DESC')
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
    this.pageSize.set(event.pageSize)
    this.pageIndex.set(event.pageIndex)
  }

  handleSortChange(event: MatSelectChange) {
    const [sortBy, sortOrder] = event.value.split('.') as [SortBy, SortOrder]
    this.sortBy.set(sortBy)
    this.sortOrder.set(sortOrder)
  }

  protected readonly ResourceStatus = ResourceStatus
}
