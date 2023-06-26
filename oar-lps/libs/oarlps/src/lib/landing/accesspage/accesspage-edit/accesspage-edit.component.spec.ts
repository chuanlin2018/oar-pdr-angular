import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccesspageEditComponent } from './accesspage-edit.component';
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
        imports: [ NoopAnimationsModule, ToastrModule.forRoot() ],
        declarations: [ AccesspageEditComponent ],
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
    fixture = TestBed.createComponent(AccesspageEditComponent);
    component = fixture.componentInstance;
    component.accessPage = {
            "accessURL": "https://www.nist.gov/itl/iad/image-group/special-database-32-multiple-encounter-dataset-meds",
            "description": "Zip file with JPEG formatted face image files.",
            "title": "Multiple Encounter Dataset (MEDS)",
            "format": {
                "description": "JPEG formatted images"
            },
            "mediaType": "application/zip",
            "downloadURL": "http://nigos.nist.gov:8080/nist/sd/32/NIST_SD32_MEDS-I_face.zip",
            "filepath": "NIST_SD32_MEDS-I_face.zip",
            "@type": [
                "nrdp:Hidden",
                "nrdp:AccessPage",
                "dcat:Distribution"
            ],
            "@id": "cmps/NIST_SD32_MEDS-I_face.zip",
            "_extensionSchemas": [
                "https://www.nist.gov/od/dm/nerdm-schema/pub/v0.1#/definitions/AccessPage"
            ]
    }

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
