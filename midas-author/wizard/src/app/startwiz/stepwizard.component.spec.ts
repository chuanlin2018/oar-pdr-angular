import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StepWizardComponent } from './stepwizard.component';
import { WizardModule } from 'oarng';
import { OARngModule } from 'oarng';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule} from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute, Router, Routes } from '@angular/router';

describe('WizardComponent', () => {
    const formBuilder: FormBuilder = new FormBuilder();
    let component: StepWizardComponent;
    let fixture: ComponentFixture<StepWizardComponent>;

    let routes : Routes = [
        { path: '', component: StepWizardComponent }
    ];

    beforeEach(waitForAsync(() => {
        const fb = new FormBuilder()
        const formGroupDirective = new FormGroupDirective([], []);

        formGroupDirective.form = fb.group({
            test: fb.control(null)
        });

        TestBed.configureTestingModule({
            declarations: [ StepWizardComponent ],
            imports: [
                WizardModule,
                OARngModule,
                HttpClientTestingModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes(routes), 
            ],
            providers: [
                FormGroupDirective,
                FormBuilder,
                { provide: FormBuilder, useValue: formBuilder },
                {provide: FormGroupDirective, useValue: formGroupDirective}
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StepWizardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
