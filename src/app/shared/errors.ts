import {HttpErrorResponse, HttpStatusCode} from '@angular/common/http'
import {catchError, EMPTY, OperatorFunction} from 'rxjs'

export function catchServerError<T>(
  cb: (err: HttpErrorResponse) => void
): OperatorFunction<T, T> {
  return catchError((error, caught) => {
    if (
      error instanceof HttpErrorResponse &&
      error.status === HttpStatusCode.InternalServerError
    ) {
      cb(error)
      return EMPTY
    }
    return caught
  })
}
