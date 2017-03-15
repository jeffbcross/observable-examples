import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseResponseOptions, HttpModule, Http, Response } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { StockQuoteComponent } from './stock-quote.component';

/**
 * I tend to import operator functions in test this way instead of from
 * rxjs/add/operator so that I can have more confidence that
 * the code under test will fail if it doesn't correctly
 * import the needed operators.
 */
import { take } from 'rxjs/operator/take';
import { skip } from 'rxjs/operator/skip';

describe('StockQuoteComponent', () => {
  let component: StockQuoteComponent;
  let fixture: ComponentFixture<StockQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockQuoteComponent ],
      imports: [
        // HttpModule
      ],
      providers: [
        BaseResponseOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: (backend, baseOptions) => {
            return new Http(backend, baseOptions);
          },
          deps: [MockBackend, BaseResponseOptions]
        }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockQuoteComponent);
    component = fixture.componentInstance;
  });

  it('should try up to 3 times', async(inject([Http, MockBackend, BaseResponseOptions], (http: Http, backend: MockBackend, resOptions: BaseResponseOptions) => {
    const badResponse = new Error('No Data');
    const goodResponse = new Response(resOptions.merge({
        body: {
          price: 0
        }
      }));


    backend.connections.subscribe((c: MockConnection) => {
      /**
       * This is a weird way that tests have to be written when using
       * retry, since the MockConnection response is actually a subject (hot)
       * as opposed to the observable (cold) that typically gets created
       * by XHRBackend. In reality, the re-subscription to connection.response
       * is what causes the work (request) to be performed again.
       *
       * In fact, this test doesn't even rely on retry behavior.
       */
      c.response.error(badResponse);
      c.response.error(badResponse);
      c.response.next(goodResponse);
    });

    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('"price": 0');
  })));


  it('should return an error message if request cannot complete', async(inject([Http, MockBackend, BaseResponseOptions], (http: Http, backend: MockBackend, resOptions: BaseResponseOptions) => {
    backend.connections.subscribe((c: MockConnection) => {
      c.mockError(new Error());
    });

    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('"error": "Tried 3 times to load data but could not."');
  })));
});
