import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import {inject, Injectable} from '@angular/core'
import {Observable} from 'rxjs'

import {environment} from '../../environments/environment'
import {SortBy, SortOrder, Trip, TripsResponse} from '../models'

@Injectable({providedIn: 'root'})
export class TripsService {
  private baseUrl = environment.apiUrl
  readonly http = inject(HttpClient)

  getTrips({
    page,
    limit,
    sortBy,
    sortOrder,
  }: {
    page: number
    limit: number
    sortBy: SortBy
    sortOrder: SortOrder
  }): Observable<TripsResponse> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    )
    const params = new HttpParams()
      // 1-indexed page
      .set('page', String(page + 1))
      .set('limit', String(limit))
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder)
    return this.http.get<TripsResponse>(`${this.baseUrl}/trips`, {
      params,
      headers,
    })
  }

  getTripById(id: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.baseUrl}/trips/${id}`)
  }

  getTripOfDay(): Observable<Trip> {
    return this.http.get<Trip>(`${this.baseUrl}/trips/random/trip-of-the-day`)
  }
}
