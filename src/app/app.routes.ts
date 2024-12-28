import {Routes} from '@angular/router'

import {TripComponent} from './features/trip/trip.component'
import {TripOfDayComponent} from './features/trip/trip-of-day.component'
import {TripsComponent} from './features/trips/trips.component'

export const routes: Routes = [
  {path: '', component: TripsComponent},
  {path: 'trips', redirectTo: '', pathMatch: 'full'},
  {path: 'trip/:id', component: TripComponent},
  {path: 'trip', redirectTo: 'trip-of-day', pathMatch: 'full'},
  {path: 'trip-of-day', component: TripOfDayComponent},
]
