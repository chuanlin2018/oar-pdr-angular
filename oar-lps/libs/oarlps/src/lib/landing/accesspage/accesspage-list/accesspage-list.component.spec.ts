import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccesspageListComponent } from './accesspage-list.component';
import { MetadataUpdateService } from '../../editcontrol/metadataupdate.service';
import { NotificationService } from '../../../shared/notification-service/notification.service';
import { UserMessageService } from '../../../frame/usermessage.service';
import { AppConfig } from '../../../config/config';
import { config, testdata } from '../../../../environments/environment';
import { TransferState } from '@angular/platform-browser';
import { AngularEnvironmentConfigService } from '../../../config/config.service';
import * as env from '../../../../environments/environment';
import { AuthService, createAuthService, WebAuthService } from '../../editcontrol/auth.service';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { GoogleAnalyticsService } from '../../../shared/ga-service/google-analytics.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AccesspageComponent', () => {
  let component: AccesspageListComponent;
  let fixture: ComponentFixture<AccesspageListComponent>;
  let cfg: AppConfig;
  let plid: Object = "browser";
  let ts: TransferState = new TransferState();

  beforeEach(async () => {
    cfg = (new AngularEnvironmentConfigService(env, plid, ts)).getConfig() as AppConfig;
    cfg.locations.pdrSearch = "https://goob.nist.gov/search";
    cfg.status = "Unit Testing";
    cfg.appVersion = "2.test";

    await TestBed.configureTestingModule({
        imports: [ NoopAnimationsModule, ToastrModule.forRoot() ],
        declarations: [ AccesspageListComponent ],
        providers: [ 
            MetadataUpdateService, 
            NotificationService, 
            UserMessageService,
            AuthService,
            DatePipe,
            GoogleAnalyticsService,
            { provide: AppConfig, useValue: cfg } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesspageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
