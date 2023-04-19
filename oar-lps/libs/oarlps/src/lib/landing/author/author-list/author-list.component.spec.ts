import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorListComponent } from './author-list.component';
import { AppConfig } from '../../../config/config';
import { TransferState } from '@angular/platform-browser';
import { AngularEnvironmentConfigService } from '../../../config/config.service';
import * as env from '../../../../environments/environment'; 
import { AuthService, WebAuthService, MockAuthService } from '../../editcontrol/auth.service';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { MetadataUpdateService } from '../../editcontrol/metadataupdate.service';
import { UserMessageService } from '../../../frame/usermessage.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AuthorListComponent', () => {
  let component: AuthorListComponent;
  let fixture: ComponentFixture<AuthorListComponent>;
  let cfg: AppConfig;
  let plid: Object = "browser";
  let ts: TransferState = new TransferState();

  beforeEach(async () => {
    cfg = (new AngularEnvironmentConfigService(env, plid, ts)).getConfig() as AppConfig;
    cfg.locations.pdrSearch = "https://goob.nist.gov/search";
    cfg.status = "Unit Testing";
    cfg.appVersion = "2.test";

    await TestBed.configureTestingModule({
        imports: [ToastrModule.forRoot(), BrowserAnimationsModule],
        declarations: [ AuthorListComponent ],
        providers: [ MetadataUpdateService, 
            UserMessageService,
            MetadataUpdateService,
            AuthService,
            DatePipe,
            { provide: AppConfig, useValue: cfg } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorListComponent);
    component = fixture.componentInstance;
    component.record = env.testdata["test1"];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
