import {Routes} from '@angular/router'

import {TripComponent} from './features/trip/trip.component'
import {TripsComponent} from './features/trips/trips.component'

export const routes: Routes = [
  {path: '', component: TripsComponent},
  {path: 'trips', redirectTo: '', pathMatch: 'full'},
  {path: 'trip/:id', component: TripComponent},
]
