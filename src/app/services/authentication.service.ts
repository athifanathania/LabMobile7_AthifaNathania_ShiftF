import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject, from, Observable, switchMap } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
const TOKEN_KEY = 'auth-login';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private alert: AlertController) {
    this.authenticationState = from(this.loadData()).pipe(
      switchMap(() => this.isAuthenticated)
    );
  }

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  authenticationState: Observable<boolean>;
  token = '';
  nama = '';
  saveData(token: string, user: any) {
    Preferences.set({ key: TOKEN_KEY, value: token });
    Preferences.set({ key: USER_KEY, value: user });
    this.token = token;
    this.nama = user;
    this.isAuthenticated.next(true);
  }

  async loadData() {
    const token = await Preferences.get({ key: TOKEN_KEY });
    const user = await Preferences.get({ key: USER_KEY });
    if (token && token.value && user && user.value) {
      this.token = token.value;
      this.nama = user.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  clearData() {
    this.token = '';
    this.nama = '';
    Preferences.remove({ key: TOKEN_KEY });
    Preferences.remove({ key: USER_KEY });
  }

  postMethod(data: any, link: any): Observable<any> {
    return this.http.post(this.apiURL() + '/' + link, data);
  }

  notifikasi(pesan: string) {
    return this.alert.create({
      header: 'Notifikasi',
      message: pesan,
      buttons: ['OK']
    }).then(res => {
      res.present();
    });
  }

  apiURL() {
    return 'http://localhost/coba-login';
  }

  logout() {
    this.isAuthenticated.next(false);
    this.clearData();
  }
}