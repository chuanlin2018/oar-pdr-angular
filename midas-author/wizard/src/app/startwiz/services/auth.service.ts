import { Inject, Injectable } from '@angular/core';
import { Observable, of, throwError, Subscriber } from 'rxjs';
import { UserDetails, deepCopy, AuthInfo, LibWebAuthService } from 'oarng';
import { WebWizardService, WizardService } from './wizard.service';
import { AppConfig, Config } from './config-service.service';
import { HttpClient } from '@angular/common/http';
import { IEnvironment } from '../../../environments/ienvironment';
import * as environment from '../../../environments/environment';

/**
 * the authentication/authorization front-end service to the customization service.
 *
 * The purpose of this service is to authenticate a user and establish their authorization to 
 * edit a resource metadata record via the customization service.  In particular, this service 
 * serves as a factory for a CustomizationService that allows editing of the resource metadata 
 * associated with a particular identifier.  
 *
 * This abstract class allows for different implementations for different execution 
 * contexts.  In particular, mock versions can be provided for development and testing 
 * contexts.
 */
export abstract class AuthService {
    protected _authcred: AuthInfo = {
        userDetails: { userId: "" },
        token: ""
    };

    /**
     * the full set of user information obtained via the log-in process
     */
    get userDetails() { return this._authcred.userDetails || {} as UserDetails; }

    /**
     * the user ID that the current authorization has been granted to.
     */
    get userID() { return this.userDetails.userId; }

    set userDetails(userDetails: UserDetails) { this._authcred.userDetails = userDetails; }

    /**
     * Store the error message returned from authorizeEditing
     */
    protected _errorMessage: string = "";

    set errorMessage(errMsg: string) { this._errorMessage = errMsg; }
    get errorMessage() { return this._errorMessage; }

    /**
     * construct the service
     */
    constructor() { }

    /**
     * return the user details in a implementation-specific way
     */
    // protected abstract _getUserDetails(): UserDetails;

    /**
     * return true if the user is currently authorized to to edit the resource metadata.
     * If false, can attempt to gain authorization via a call to authorizeEditing();
     */
    public abstract isAuthorized(): boolean;

    /**
     * create a CustomizationService that allows the user to edit the resource metadata 
     * associated with the given ID.  Note that an implementation may need to redirect the browser 
     * to an authentication service to determine who the current user is.  
     *
     * @param resid     the identifier for the resource to edit
     * @param nologin   if false (default) and the user is not logged in, the browser will be redirected 
     *                  to the authentication service.  If true, redirection will not occur; instead, 
     *                  no user information is set and null is returned if the user is not logged in.  
     * @param Observable<CustomizationService>  an observable wrapped CustomizationService that should 
     *                  be used to send edits to the customization server.  The service will be null if 
     *                  the user is not authorized.  
     */
    public abstract authorizeEditing(resid: string, nologin?: boolean)
        : Observable<WizardService>;

    /**
     * redirect the browser to the authentication service, instructing it to return back to 
     * the current landing page.  
     */
    public abstract loginUser(): void;
}

@Injectable()
export class WebAuthService extends AuthService {
    private _authtok: string = "";

    /**
     * the authorization token that gives the user permission to edit the resource metadata
     */
    get authToken() { return this._authcred.token; }

    constructor(
        private httpcli: HttpClient,
        public libWebAuthService: LibWebAuthService) {
            super(); 
        }

    /**
     * create a CustomizationService that allows the user to edit the resource metadata 
     * associated with the given ID.  If the CustomizationService returned through the 
     * Observable is null, the user is not authorized to edit.  
     *
     * Note that instead of returning, this method may redirect the browser to an authentication
     * server to authenticate the user.  
     * 
     * @param resid     the identifier for the resource to edit
     * @param nologin   if false (default) and the user is not logged in, the browser will be redirected 
     *                  to the authentication service.  If true, redirection will not occur; instead, 
     *                  no user information is set and null is returned if the user is not logged in.  
     */
    public authorizeEditing(resid: string, nologin: boolean = false): Observable<boolean> {
        if (this.authToken){
            return of(true);
        }

        // we need an authorization token
        return new Observable<boolean>(subscriber => {
            this.libWebAuthService.getAuthInfo(resid).subscribe({
                next: (info) =>{
                    this._authcred.token = info.token;
                    this._authcred.userDetails = deepCopy(info.userDetails);
                    if (info.token) {
                        // the user is authenticated and authorized to edit!
                        if(this.endpoint && this.authToken){
                            subscriber.next(
                                new WebWizardService(resid, this.endpoint, this.authToken,
                                    this.httpcli)
                            );
                        }else{
                            let err = "Missing endpoint for updating.";
                            if(!this.authToken){
                                err = "Missing auth Token.";
                            }

                            console.log(err);
                            subscriber.error(err);
                        }

                        subscriber.complete();
                    }
                    else if (info.userDetails && info.userDetails.userId) {
                        // the user is authenticated but not authorized
                        this.errorMessage = info['errorMessage'];
                        subscriber.next(undefined);
                        subscriber.complete();
                    }
                    else {
                        // the user is not authenticated!
                        subscriber.complete();

                        // redirect the browser to the authentication server
                        if (!nologin){
                            this.loginUser();
                        }else {
                            subscriber.next(undefined);
                            subscriber.complete();
                        }
                    }
                },
                error: (err) => {
                    if (err['statusCode'] && err.statusCode == 401) {
                        // User needs to log in; redirect the browser to the authentication server
                        if (!nologin){
                            this.loginUser();
                        }else {
                            subscriber.next(undefined);
                            subscriber.complete();
                        }
                    }
                    else
                        subscriber.error(err);
                }
            })
        });
    }

    /**
     * return true if the user is currently authorized to to edit the resource metadata.
     * If false, can attempt to gain authorization via a call to authorizeEditing();
     */
    public isAuthorized(): boolean {
        return Boolean(this.authToken);
    }

    /**
     * redirect the browser to the authentication service, instructing it to return back to 
     * the current landing page.  
     * 
     * @return string   the authenticated user's identifier, or null if authentication was not 
     *                  successful.  
     */
    public loginUser(): void {
        let redirectURL = this.endpoint + "saml/login?redirectTo=" + window.location.href + "?editEnabled=true";
        // console.log("Redirecting to " + redirectURL + " to authenticate user");
        window.location.assign(redirectURL);
    }
}

/**
 * An AuthService intended for development and testing purposes which simulates interaction 
 * with a authorization service.
 */
// @Injectable()
// export class MockAuthService extends AuthService {
//     private resdata: {} = {};

//     /**
//      * construct the authorization service
//      *
//      * @param resmd      the original resource metadata 
//      * @param userid     the ID of the user; default "anon"
//      */
//     constructor(userDetails?: UserDetails, ngenv2?: IEnvironment, private httpcli?: HttpClient) {
//         super();
//         if (userDetails === undefined) {
//             this._authcred = {
//                 userDetails: {
//                 userId: "anon",
//                 userName: "Anon",
//                 userLastName: "Lee",
//                 userEmail: "Anon.Lee@nist.gov"
//                 },
//                 token: 'fake jwt token'
//             }
//         }else{
//             this._authcred = {
//                 userDetails: userDetails,
//                 token: 'fake jwt token'
//             }
//         }

//         if(ngenv2 == undefined){
//             ngenv2 = environment;
//         }
//         console.log("ngenv2", ngenv2);
        
//         if (!ngenv2.testdata)
//             throw new Error("No test data encoded into angular environment");
//         if (Object.keys(ngenv2.testdata).length < 0)
//             console.warn("No NERDm records included in the angular environment");

//         // load resource metadata lookup by ediid
//         // for (let key of Object.keys(ngenv2.testdata)) {
//         //     if (ngenv2.testdata[key]['ediid'])
//         //         this.resdata[ngenv2.testdata[key]['ediid']] = ngenv2.testdata[key];
//         // }
//     }

//     /**
//      * return true if the user is currently authorized to to edit the resource metadata.
//      * If false, can attempt to gain authorization via a call to authorizeEditing();
//      */
//     public isAuthorized(): boolean {
//         return Boolean(this.userDetails);
//     }

//     /**
//      * create a CustomizationService that allows the user to edit the resource metadata 
//      * associated with the given ID.
//      *
//      * @param resid     the identifier for the resource to edit
//      * @param nologin   if false (default) and the user is not logged in, the browser will be redirected 
//      *                  to the authentication service.  If true, redirection will not occur; instead, 
//      *                  no user information is set and null is returned if the user is not logged in.  
//      * @param Observable<CustomizationService>  an observable wrapped CustomizationService that should 
//      *                  be used to send edits to the customization server.  The service will be null if 
//      *                  the user is not authorized.  
//      */
//     public authorizeEditing(resid: string, nologin: boolean = false): Observable<WizardService> {
//         // simulate logging in with a redirect 
//         if (!this.userDetails){ 
//           this.loginUser();}
//         // if (!this.resdata.resid){
//         //     return of<WizardService>();
//         // }
//         // return of<WizardService>(new InMemCustomizationService(this.resdata[resid], this.httpcli));
//         return of<WizardService>();
//     }

//     /**
//      * redirect the browser to the authentication service, instructing it to return back to 
//      * the current landing page.  
//      */
//     public loginUser(): void {
//         let redirectURL = window.location.href + "?editEnabled=true";
//         console.log("Bypassing authentication service; redirecting directly to " + redirectURL);
//         if (!this._authcred.userDetails){
//             this._authcred = {
//                 userDetails: {
//                 userId: "anon",
//                 userName: "Anon",
//                 userLastName: "Lee",
//                 userEmail: "Anon.Lee@nist.gov"
//                 },
//                 token: 'fake jwt token'
//             }
//         } 
//         window.location.assign(redirectURL);
//     }
// }

/**
 * create an AuthService based on the runtime context.
 * 
 * This factory function determines whether the application has access to a customization 
 * web service (e.g. in production mode under oar-docker).  In this case, it will return 
 * a AuthService configured to use the service.  In a development runtime context, where 
 * the app is running standalone without such access, a mock service is returned.  
 * 
 * Which type of AuthService is returned is determined by the value of 
 * context.useCustomizationService from the angular environment (i.e. 
 * src/environments/environment.ts).  A value of false assumes a develoment context.
 */
export function createAuthService(ngenv: IEnvironment, config: AppConfig, httpClient: HttpClient, libWebAuthService: LibWebAuthService, devmode?: boolean)
    : AuthService {

    if (devmode === undefined)
        devmode = Boolean(ngenv.context && ngenv.context['useCustomizationService']) === false;

    if (!devmode) {
        // production mode
        console.log("Will use configured customization web service");
        return new WebAuthService(config, httpClient, libWebAuthService);
    }

    // dev mode - not working yet
    // if (!ngenv['context'])
    //     console.warn("Warning: angular environment is missing context data");
    // console.log("Using mock AuthService/CustomizationService");
    // return new MockAuthService(undefined, ngenv, httpClient);
    return new WebAuthService(config, httpClient, libWebAuthService);
}