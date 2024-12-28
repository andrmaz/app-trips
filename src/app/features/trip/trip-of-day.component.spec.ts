import {ComponentFixture, TestBed} from '@angular/core/testing'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {ActivatedRoute} from '@angular/router'
import {TranslateModule} from '@ngx-translate/core'
import {of} from 'rxjs'

import {CacheService} from '../../services/cache.service'
import {SnackbarService} from '../../services/snackbar.service'
import {TripsService} from '../../services/trips.service'
import {TripOfDayComponent} from './trip-of-day.component'

describe('TripOfDayComponent', () => {
  let component: TripOfDayComponent
  let fixture: ComponentFixture<TripOfDayComponent>
  let tripsService: jasmine.SpyObj<TripsService>
  let cacheService: jasmine.SpyObj<CacheService>

  beforeEach(async () => {
    const tripsServiceSpy = jasmine.createSpyObj('TripsService', [
      'getTripOfDay',
    ])
    const snackbarServiceSpy = jasmine.createSpyObj('SnackbarService', [
      'error',
    ])
    const cacheServiceSpy = jasmine.createSpyObj('CacheService', [
      'cacheObservable',
    ])

    cacheServiceSpy.cacheObservable.and.returnValue(of())
    tripsServiceSpy.getTripOfDay.and.returnValue(of())

    await TestBed.configureTestingModule({
      imports: [
        TripOfDayComponent,
        TranslateModule.forRoot(),
        BrowserAnimationsModule,
      ],
      providers: [
        {provide: TripsService, useValue: tripsServiceSpy},
        {provide: SnackbarService, useValue: snackbarServiceSpy},
        {provide: CacheService, useValue: cacheServiceSpy},
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({get: () => '1'}),
          },
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(TripOfDayComponent)
    component = fixture.componentInstance
    tripsService = TestBed.inject(TripsService) as jasmine.SpyObj<TripsService>
    cacheService = TestBed.inject(CacheService) as jasmine.SpyObj<CacheService>
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TripOfDayComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should display trip of the day details', () => {
    const trip = {
      co2: 10,
      creationDate: new Date(),
      description: 'A beautiful trip to the mountains.',
      id: '1',
      imageUrl: 'https://example.com/image.jpg',
      nrOfRatings: 100,
      price: 200,
      rating: 4.5,
      tags: ['mountains', 'adventure'],
      thumbnailUrl: 'https://example.com/thumbnail.jpg',
      title: 'Mountain Adventure',
      verticalType: 'Outdoor',
    }
    cacheService.cacheObservable.and.returnValue(of(trip))
    tripsService.getTripOfDay.and.returnValue(of(trip))

    fixture.detectChanges()

    expect(cacheService.cacheObservable).toHaveBeenCalled()
    expect(tripsService.getTripOfDay).toHaveBeenCalled()
  })
})
