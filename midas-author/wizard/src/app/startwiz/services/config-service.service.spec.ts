import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppConfig } from './config-service.service';

describe('ConfigServiceService', () => {
    let service: AppConfig;

    beforeEach(waitForAsync(() => {

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [

            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AppConfig);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
