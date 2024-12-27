import {
  AsyncPipe,
  CurrencyPipe,
  DatePipe,
  NgOptimizedImage,
  UpperCasePipe,
} from '@angular/common'
import {Component, inject} from '@angular/core'
import {MatButton} from '@angular/material/button'
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card'
import {MatChip, MatChipSet} from '@angular/material/chips'
import {MatDivider} from '@angular/material/divider'
import {MatIcon} from '@angular/material/icon'
import {MatToolbar} from '@angular/material/toolbar'
import {ActivatedRoute} from '@angular/router'
import {TranslatePipe} from '@ngx-translate/core'
import {switchMap} from 'rxjs'

import {SnackbarService} from '../../services/snackbar.service'
import {TripsService} from '../../services/trips.service'
import {catchServerError} from '../../shared/errors'

@Component({
  selector: 'app-trip',
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
  ],
})
export class TripComponent {
  readonly route = inject(ActivatedRoute)
  readonly tripsService = inject(TripsService)
  readonly snackbarService = inject(SnackbarService)

  readonly trip$ = this.route.paramMap.pipe(
    catchServerError(() => this.snackbarService.error()),
    switchMap(params => {
      const id = params.get('id')!
      return this.tripsService.getTripById(id)
    })
  )
}
