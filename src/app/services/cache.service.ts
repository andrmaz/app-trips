import {Injectable} from '@angular/core'
import {Observable, of, tap} from 'rxjs'

@Injectable({providedIn: 'root'})
export class CacheService {
  get<T>(key: string): Observable<T> | null {
    const value = window.localStorage.getItem(key)
    if (!value) {
      return null
    }

    const data = JSON.parse(value)
    const now = new Date().getTime()
    if (now > data.expiry) {
      window.localStorage.removeItem(key)
      return null
    }

    return of(data.value)
  }

  set<T>(key: string, value: T): void {
    const today = new Date().getDate()
    const tomorrow = new Date().setDate(today + 1)
    const startOfTomorrow = new Date(tomorrow).setHours(0, 0, 0, 0)
    const data = JSON.stringify({expiry: startOfTomorrow, value})
    window.localStorage.setItem(key, data)
  }

  cacheObservable<T>(key: string, obs: Observable<T>): Observable<T> {
    const cached = this.get<T>(key)
    if (cached) {
      return cached
    } else {
      return obs.pipe(
        tap(value => {
          this.set(key, value)
        })
      )
    }
  }
}
