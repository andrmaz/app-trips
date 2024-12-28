import {Component} from '@angular/core'
import {TranslatePipe} from '@ngx-translate/core'

@Component({
  selector: 'app-generic-error',
  template: ` <p>{{ 'app.errors.generic' | translate }}</p> `,
  imports: [TranslatePipe],
})
export class GenericErrorComponent {}
