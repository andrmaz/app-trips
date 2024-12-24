import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import {inject, Injectable} from '@angular/core'
import {Observable} from 'rxjs'

import {SortBy, SortOrder, TripsResponse} from '../models'

@Injectable({providedIn: 'root'})
export class TripsService {
  private baseUrl =
    'https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/v1'
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
    return this.http.get<TripsResponse>(this.baseUrl + '/trips', {
      params,
      headers,
    })
  }
}
