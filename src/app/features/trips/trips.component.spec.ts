import {ComponentFixture, TestBed} from '@angular/core/testing'
import {PageEvent} from '@angular/material/paginator'
import {MatSelectChange} from '@angular/material/select'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {TranslateModule} from '@ngx-translate/core'
import {of} from 'rxjs'

import {APP_CONFIG} from '../../config'
import {TripsResponse} from '../../models'
import {SnackbarService} from '../../services/snackbar.service'
import {TripsService} from '../../services/trips.service'
import {TripsComponent} from './trips.component'

describe('TripsComponent', () => {
  let component: TripsComponent
  let fixture: ComponentFixture<TripsComponent>
  let tripsService: jasmine.SpyObj<TripsService>

  beforeEach(async () => {
    const tripsServiceSpy = jasmine.createSpyObj('TripsService', ['getTrips'])
    const snackbarServiceSpy = jasmine.createSpyObj('SnackbarService', [
      'error',
    ])
    const appConfigMock = {
      paginator: {
        hidePageSize: false,
        showPageSizeOptions: true,
        showFirstLastButtons: true,
        disabled: false,
        pageSizeOptions: [10, 20, 30],
        sortByOptions: ['rating', 'price'],
        sortOrderOptions: ['ASC', 'DESC'],
      },
    }

    await TestBed.configureTestingModule({
      imports: [
        TripsComponent,
        TranslateModule.forRoot(),
        BrowserAnimationsModule,
      ],
      providers: [
        {provide: TripsService, useValue: tripsServiceSpy},
        {provide: SnackbarService, useValue: snackbarServiceSpy},
        {provide: APP_CONFIG, useValue: appConfigMock},
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(TripsComponent)
    component = fixture.componentInstance
    tripsService = TestBed.inject(TripsService) as jasmine.SpyObj<TripsService>
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsComponent)
    component = fixture.componentInstance
    component.pageIndex.set(0)
    component.pageSize.set(10)
    component.sortBy.set('rating')
    component.sortOrder.set('DESC')
    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should load trips on init', async () => {
    const tripsResponse: TripsResponse = {
      total: 50,
      items: [],
      limit: 10,
      page: 1,
    }
    tripsService.getTrips.and.returnValue(of(tripsResponse))

    fixture.detectChanges()
    await fixture.whenStable()

    expect(tripsService.getTrips).toHaveBeenCalledWith({
      page: 0,
      limit: 10,
      sortBy: 'rating',
      sortOrder: 'DESC',
    })
  })

  it('should handle page event', () => {
    const pageEvent = {pageIndex: 1, pageSize: 20} as PageEvent

    component.handlePageEvent(pageEvent)

    expect(component.pageIndex()).toBe(1)
    expect(component.pageSize()).toBe(20)
  })

  it('should handle sort change', () => {
    const sortChangeEvent = {value: 'rating.ASC'} as MatSelectChange

    component.handleSortChange(sortChangeEvent)

    expect(component.sortBy()).toBe('rating')
    expect(component.sortOrder()).toBe('ASC')
  })
})
