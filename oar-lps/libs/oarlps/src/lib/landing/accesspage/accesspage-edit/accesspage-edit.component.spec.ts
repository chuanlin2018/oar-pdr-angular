import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetadataUpdateService } from '../../editcontrol/metadataupdate.service';
import { AccesspageEditComponent } from './accesspage-edit.component';
import { UserMessageService } from '../../../frame/usermessage.service';
import { AppConfig } from '../../../config/config';
import * as env from '../../../../environments/environment'; 
import { TransferState } from '@angular/platform-browser';
import { AngularEnvironmentConfigService } from '../../../config/config.service';
import { AuthService } from '../../editcontrol/auth.service';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NotificationService } from '../../../shared/notification-service/notification.service';
import { GoogleAnalyticsService } from '../../../shared/ga-service/google-analytics.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SingleApageComponent', () => {
    let component: AccesspageEditComponent;
    let fixture: ComponentFixture<AccesspageEditComponent>;
    let cfg: AppConfig;
    let plid: Object = "browser";
    let ts: TransferState = new TransferState();

    beforeEach(async () => {
        cfg = (new AngularEnvironmentConfigService(env, plid, ts)).getConfig() as AppConfig;
        cfg.locations.pdrSearch = "https://goob.nist.gov/search";
        cfg.status = "Unit Testing";
        cfg.appVersion = "2.test";

        await TestBed.configureTestingModule({
        declarations: [ AccesspageEditComponent ],
        providers: [ UserMessageService, 
            MetadataUpdateService, 
            AuthService, 
            DatePipe,
            NotificationService,
            GoogleAnalyticsService,
            { provide: AppConfig, useValue: cfg } ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AccesspageEditComponent);
        component = fixture.componentInstance;
        debugger
        component.accessPage = env.testdata["test1"].components[1];
        fixture.detectChanges();
    });

    it('should create', () => {
        debugger
        expect(component).toBeTruthy();
    });
});
