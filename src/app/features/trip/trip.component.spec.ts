import {ComponentFixture, TestBed} from '@angular/core/testing'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {ActivatedRoute} from '@angular/router'
import {TranslateModule} from '@ngx-translate/core'
import {of} from 'rxjs'

import {Trip} from '../../models'
import {SnackbarService} from '../../services/snackbar.service'
import {TripsService} from '../../services/trips.service'
import {TripComponent} from './trip.component'

describe('TripComponent', () => {
  let component: TripComponent
  let fixture: ComponentFixture<TripComponent>
  let tripsService: jasmine.SpyObj<TripsService>

  beforeEach(async () => {
    const tripsServiceSpy = jasmine.createSpyObj('TripsService', [
      'getTripById',
    ])
    const snackbarServiceSpy = jasmine.createSpyObj('SnackbarService', [
      'error',
    ])

    await TestBed.configureTestingModule({
      imports: [
        TripComponent,
        TranslateModule.forRoot(),
        BrowserAnimationsModule,
      ],
      providers: [
        {provide: TripsService, useValue: tripsServiceSpy},
        {provide: SnackbarService, useValue: snackbarServiceSpy},
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({get: () => '1'}),
          },
        },
      ],
    }).compileComponents()

    tripsService = TestBed.inject(TripsService) as jasmine.SpyObj<TripsService>
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TripComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch trip details on init', () => {
    const trip: Trip = {
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
    tripsService.getTripById.and.returnValue(of(trip))

    fixture.detectChanges()

    expect(tripsService.getTripById).toHaveBeenCalledWith('1')
  })

  it('should include a link to the home page', () => {
    const homeLink = fixture.nativeElement.querySelector('a[routerLink="/"]')
    expect(homeLink).toBeTruthy()
  })
})
