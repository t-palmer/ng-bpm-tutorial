import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BpmComponentsModule, BpmModule } from 'ng-bpm';
import { ConnectionConfigurationComponent } from './connection-configuration/connection-configuration.component';
import { ConnectionManagerService } from './connection-manager.service';

@NgModule({
  declarations: [
    AppComponent,
    ConnectionConfigurationComponent
  ],
  imports: [
    BrowserModule,
    BpmModule,
    BpmComponentsModule
  ],
  providers: [
      ConnectionManagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
