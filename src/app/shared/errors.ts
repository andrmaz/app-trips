import {HttpErrorResponse, HttpStatusCode} from '@angular/common/http'
import {catchError, EMPTY, OperatorFunction} from 'rxjs'

export function catchServerError<T>(
  cb: (err: HttpErrorResponse) => void
): OperatorFunction<T, T> {
  return catchError((e, caught) => {
    if (
      e instanceof HttpErrorResponse &&
      e.status === HttpStatusCode.InternalServerError
    ) {
      cb(e)
      return EMPTY
    }
    return caught
  })
}
