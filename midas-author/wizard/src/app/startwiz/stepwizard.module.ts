import { NgModule }     from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WizardModule } from 'oarng';
import { StepWizardComponent } from './stepwizard.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from './components/components.module';
import { WizardService } from './services/wizard.service';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        WizardModule,
        ComponentsModule,
        RouterModule
    ],
    declarations: [
        StepWizardComponent
    ],
    providers: [
        WizardService
    ],
    exports: [
        StepWizardComponent
    ]
})
export class StepWizModule { }
