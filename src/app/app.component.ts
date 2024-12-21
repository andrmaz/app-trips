import {Component} from '@angular/core'
import {RouterOutlet} from '@angular/router'
import {TranslatePipe} from '@ngx-translate/core'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'app-trips'
}
