import { Injectable } from '@angular/core';
declare const SLAP: any;

export class LoginInfo {
    public verified = false;
    public userName = '';
    public userId = '';
}

@Injectable()
export class ConnectionManagerService {
    // True when we have been verified as logged in and the BpmService is ready for use.
    public initialized = false;
    // The connection information
    private loginInfo: LoginInfo;

    private login (serverUrl: string): Promise<LoginInfo> {
        // When NOT initialized we login and initialize the BpmService.
        // providerUrl is no longer used.
        const loginConfig = {
            'providerUrl': '',
            'serverUrl': serverUrl
        };

        const self = this;
        return new Promise(
            function (resolve) {
                SLAP.initLogin(loginConfig , {},
                    function ( loginInfo: LoginInfo ) {
                        // This callback may be called multiple times.
                        // We wait until verified is true, then we know we are connected.
                        if (loginInfo.verified) {
                            self.loginInfo = loginInfo;
                            self.initialized = true;
                            resolve(self.loginInfo);
                        }
                    }
                );
            }
        );
    }

    // This returns the LoginInfo when the user is completely logged in.
    // Only then should you use BpmService and BpmAdminService.
    public getLoginInfo(serverUrl: string): Promise<LoginInfo> {
        // if we are initialized we return the existing one.
        if (this.initialized) {
            return Promise.resolve(this.loginInfo);
        }
        return this.login(serverUrl);
    }
}
