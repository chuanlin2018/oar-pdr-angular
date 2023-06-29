import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SoftwareinfoComponent } from './softwareinfo.component';
import { WizardModule } from 'oarng';
import { OARngModule } from 'oarng';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule} from "@angular/forms";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SoftwareinfoComponent', () => {
    let component: SoftwareinfoComponent;
    let fixture: ComponentFixture<SoftwareinfoComponent>;

    beforeEach(waitForAsync(() => {
        const fb = new FormBuilder()
        const formGroupDirective = new FormGroupDirective([], []);

        formGroupDirective.form = fb.group({
            'pubtype': fb.group({
                resourceType: [""]
            }),
            'softwareInfo': fb.group({
                provideLink: [false],
                softwareLink: [""]
            }),
            'contactInfo': fb.group({
                creatorIsContact: [true],
                contactName: [""]
            }),
            'files': fb.group({
                willUpload: [true]
            }),
            'assocPapers': fb.group({
                assocPageType: [""]
            })
        });

        TestBed.configureTestingModule({
            declarations: [ SoftwareinfoComponent ],
            imports: [
                WizardModule,
                OARngModule,
                HttpClientTestingModule,
                ReactiveFormsModule,
                NoopAnimationsModule
            ],
            providers: [
                FormGroupDirective,
                FormBuilder,
                { provide: FormBuilder, useValue: FormBuilder },
                { provide: FormGroupDirective, useValue: formGroupDirective }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SoftwareinfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
