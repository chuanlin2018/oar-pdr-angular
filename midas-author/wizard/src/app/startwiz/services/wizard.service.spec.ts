import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WizardService } from './wizard.service';

describe('WizardService', () => {
    let service: WizardService;

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
        service = TestBed.inject(WizardService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
