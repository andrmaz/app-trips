import {
  AsyncPipe,
  CurrencyPipe,
  DatePipe,
  NgOptimizedImage,
  UpperCasePipe,
} from '@angular/common'
import {Component, inject} from '@angular/core'
import {MatAnchor, MatButton} from '@angular/material/button'
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card'
import {MatChip, MatChipSet} from '@angular/material/chips'
import {MatDivider} from '@angular/material/divider'
import {MatIcon} from '@angular/material/icon'
import {MatProgressSpinner} from '@angular/material/progress-spinner'
import {MatToolbar} from '@angular/material/toolbar'
import {RouterLink, RouterLinkActive} from '@angular/router'
import {TranslatePipe} from '@ngx-translate/core'

import {CacheService} from '../../services/cache.service'
import {SnackbarService} from '../../services/snackbar.service'
import {TripsService} from '../../services/trips.service'
import {catchServerError} from '../../shared/errors'

@Component({
  selector: 'app-trip-of-day',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css'],
  imports: [
    AsyncPipe,
    NgOptimizedImage,
    MatCard,
    MatCardContent,
    MatChipSet,
    MatChip,
    CurrencyPipe,
    MatIcon,
    MatButton,
    DatePipe,
    MatToolbar,
    TranslatePipe,
    MatDivider,
    MatCardActions,
    UpperCasePipe,
    MatProgressSpinner,
    MatAnchor,
    RouterLinkActive,
    RouterLink,
  ],
})
export class TripOfDayComponent {
  readonly tripsService = inject(TripsService)
  readonly snackbarService = inject(SnackbarService)
  readonly cacheService = inject(CacheService)

  readonly trip$ = this.cacheService
    .cacheObservable('TRIP_OF_DAY', this.tripsService.getTripOfDay())
    .pipe(catchServerError(() => this.snackbarService.error()))
}
