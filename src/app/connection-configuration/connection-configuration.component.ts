import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { BpmConnectionServer } from 'ng-bpm';
import { ConnectionManagerService, LoginInfo } from '../connection-manager.service';
import { BpmTenant } from 'ng-bpm';
import { BpmApplication } from 'ng-bpm';
import { BpmService } from 'ng-bpm';

/*
*/
@Component({
  selector: 'app-connection-configuration',
  templateUrl: './connection-configuration.component.html',
  styleUrls: ['./connection-configuration.component.css']
})
export class ConnectionConfigurationComponent implements OnInit {

    @Output() applicationConnection = new EventEmitter<BpmApplication>();

    // The toggler for the collapse in the GUI
    isCollapsed = true;

    // URL to the BPM server
    private server = 'http://interstagedemo:49950/aa/';
    private serverConnection: BpmConnectionServer;

    // Array of Tenants to populate the Tenant select
    private tenants: BpmTenant[] = [];
    // Value of the Tenants select
    private selectedTenant: BpmTenant;
    // Array of Application to populate the Tenant select
    private applications: BpmApplication[] = [];
    // Value of the Applications select
    private selectedApplication: BpmApplication;
    // Array of pi objects fetched from server



    connectToServer() {
        this.serverConnection = new BpmConnectionServer(this.server);
        const self = this;
        this.connectionManagerService
            .getLoginInfo(this.server)
            .then(
                function(loginInfo: LoginInfo): void {
                    // Once we have the login info we know the user is logged in.
                    // So we can get the list of Tenants from the BPM server
                    self.bpmService
                        .getTenants(self.serverConnection)
                        .subscribe((result: any) => {
                            self.tenants = result;
                            console.log('self.tenants', self.tenants);
                            if (self.tenants.length > 0) {
                                self.selectedTenant = self.tenants[0];
                                self.onTenantChange(self.selectedTenant);
                            }
                        });
                }
            );
    }

    private onTenantChange(tenant: BpmTenant) {
        // When the selected tenant changes we need to fetch the Applications.
        const self = this;
        this.bpmService
            .getApplications(tenant.tenantConnection)
            .subscribe((result: BpmApplication[]) => {
                self.applications = result;
                if (self.applications.length > 0) {
                    self.selectedApplication = self.applications[0];
                    self.onApplicationChange(self.selectedApplication);
                }
            });
    }

    private onApplicationChange(application: BpmApplication) {
        this.applicationConnection.emit(application);
    }

    ngOnInit(): void {
        this.connectToServer();
    }

    // ConnectionManagerService makes sure the user is logged in.
    constructor(
        private connectionManagerService: ConnectionManagerService,
        private bpmService: BpmService
    ) { }

}
