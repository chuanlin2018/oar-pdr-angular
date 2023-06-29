import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FilesComponent } from './files.component';
import { WizardModule } from 'oarng';
import { OARngModule } from 'oarng';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule} from "@angular/forms";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FilesComponent', () => {
    let component: FilesComponent;
    let fixture: ComponentFixture<FilesComponent>;

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
            declarations: [ FilesComponent ],
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
        fixture = TestBed.createComponent(FilesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
