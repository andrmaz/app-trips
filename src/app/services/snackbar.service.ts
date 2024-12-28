import {ComponentType} from '@angular/cdk/portal'
import {Component, inject, Injectable} from '@angular/core'
import {MatSnackBar} from '@angular/material/snack-bar'

import {GenericErrorComponent} from '../components/generic-error.component'

@Injectable({providedIn: 'root'})
export class SnackbarService {
  readonly snackBar = inject(MatSnackBar)

  error(component: ComponentType<Component> = GenericErrorComponent) {
    this.snackBar.openFromComponent(component, {duration: 5000})
  }
}
