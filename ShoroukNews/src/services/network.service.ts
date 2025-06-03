import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx'
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController, Platform } from '@ionic/angular';

export enum ConnectionStatus {
  Online,
  Offline
}


@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Offline);

  constructor(private network: Network, private toastController: ToastController, private platform: Platform) {
    this.platform.ready().then(() => {
      this.initializeNetworkEvents();
      let status = this.network.type !== 'none' ? ConnectionStatus.Online : ConnectionStatus.Offline;
      this.status.next(status);
    });
  }
  
  public initializeNetworkEvents() {
    this.network.onDisconnect().subscribe(() => {
      
      this.updateNetworkStatus(ConnectionStatus.Offline);
      // if (this.status.getValue() === ConnectionStatus.Online) {
      //   console.log('WE ARE OFFLINE');
      //   this.updateNetworkStatus(ConnectionStatus.Offline);
      // }
    });

    this.network.onConnect().subscribe(() => {
    
      this.updateNetworkStatus(ConnectionStatus.Online);
     
    });
  }

  private async updateNetworkStatus(status: ConnectionStatus) {
    this.status.next(status);
  }

  public onNetworkChange(): Observable<ConnectionStatus> {
    return this.status.asObservable();
  }

  public getCurrentNetworkStatus(): ConnectionStatus {
    return this.status.getValue();
  }
}
