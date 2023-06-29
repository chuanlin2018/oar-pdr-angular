import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AssociatedPapersComponent } from './associated-papers.component';
import { WizardModule } from 'oarng';
import { OARngModule } from 'oarng';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule} from "@angular/forms";

describe('AssociatedPapersComponent', () => {
    let component: AssociatedPapersComponent;
    let fixture: ComponentFixture<AssociatedPapersComponent>;
    const formBuilder: FormBuilder = new FormBuilder();

    beforeEach(waitForAsync(() => {
        const fb = new FormBuilder()
        const formGroupDirective = new FormGroupDirective([], []);

        formGroupDirective.form = fb.group({
            test: fb.control(null)
        });
        
        TestBed.configureTestingModule({
            declarations: [ AssociatedPapersComponent ],
            imports: [
                WizardModule,
                OARngModule,
                HttpClientTestingModule,
                ReactiveFormsModule
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
        fixture = TestBed.createComponent(AssociatedPapersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
