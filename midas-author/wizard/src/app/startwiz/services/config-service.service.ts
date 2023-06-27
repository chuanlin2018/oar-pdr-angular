import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
// import process from 'process';

declare var require: any

const process = require('process');

export interface Config {
    MIDASAPI: string;
    LANDING: string
    PDRAPI: string;
    GACODE: string;
    APPVERSION: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppConfig {
    private appConfig: any;
    private confCall: any;
    private envVariables = "assets/environment.json";
    private confValues = {} as Config;

    constructor(private http: HttpClient, @Inject(PLATFORM_ID)
                private platformId: Object
    ) { }

    loadAppConfig() {
        this.confCall = this.http.get(this.envVariables)
        .toPromise()
        .then(
            resp => {
                console.log("Wizard load config returns:", resp);
                // resp as Config;
                this.confValues.MIDASAPI = (resp as Config)['MIDASAPI'];
                this.confValues.LANDING = (resp as Config)['LANDING'];
                this.confValues.PDRAPI = (resp as Config)['PDRAPI'];
                this.confValues.GACODE = (resp as Config)['GACODE'];
                this.confValues.APPVERSION = (resp as Config)['APPVERSION'];
                console.log("In Browser read environment variables: " + JSON.stringify(this.confValues));
            },
            err => {
            console.log("ERROR IN CONFIG :" + JSON.stringify(err));
            }
        );
        return this.confCall;
    }

    getConfig() {
    // console.log(" ****** In Browser 3: "+ JSON.stringify(this.confValues));
        return this.confValues;
    }

    loadConfigForTest(){
        this.confValues = {
            "MIDASAPI":  "http://localhost:9091/midas/",
            "PDRAPI":  "https://localhost:4200/od/id/",
            "LANDING": "https://data.nist.gov/rmm/",
            "GACODE":  "not-set",
            "APPVERSION": "1.3.0"
        };
    }    
}
