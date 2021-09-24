import { TestBed } from '@angular/core/testing';

import { PatientService } from './patient.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PatientService', () => {
  let service: PatientService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PatientService]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PatientService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should invoke save endpoint', () => {
    service.save({}).subscribe(resp => {
      expect(resp).toEqual({});
    })

    const dataAPI = `${service.saveUrl}`;
    const req = httpTestingController.expectOne(`${dataAPI}`);

    expect(req.request.method).toEqual('POST');

    req.flush({});
  });

  it('should invoke update endpoint', () => {
    service.update('any-id', {}).subscribe(resp => {
      expect(resp).toEqual({});
    })

    const dataAPI = `${service.updateUrl}any-id`;
    const req = httpTestingController.expectOne(`${dataAPI}`);

    expect(req.request.method).toEqual('PUT');

    req.flush({});
  });

  it('should invoke fetch patients by page endpoint', () => {
    service.findNextData(0, 3).subscribe(resp => {
      expect(resp).toEqual({});
    })

    const dataAPI = `${service.getAllByPagingUrl}?page=0&size=3`;
    const req = httpTestingController.expectOne(`${dataAPI}`);

    expect(req.request.method).toEqual('GET');

    req.flush({});
  });

  it('shoudl invoke delete endpoint', () => {
    service.delete('1').subscribe(resp => {
      expect(resp).toEqual({});
    })

    const dataAPI = `${service.deleteUrl}?id=1`;
    const req = httpTestingController.expectOne(`${dataAPI}`);

    expect(req.request.method).toEqual('DELETE');

    req.flush({});
  });


});
