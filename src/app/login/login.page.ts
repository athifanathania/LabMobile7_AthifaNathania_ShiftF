import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: any;
  password: any;
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    if (this.username != null && this.password != null) {
      const data = {
        username: this.username,
        password: this.password
      }
      this.authService.postMethod(data, 'login.php').subscribe({
        next: (res) => {
          if (res.status_login == "berhasil") {
            this.authService.saveData(res.token, res.username);
            this.username = '';
            this.password = '';
            this.router.navigateByUrl('/home');
          } else {
            this.authService.notifikasi('Username atau Password Salah');
          }
        },
        error: (e) => {
          this.authService.notifikasi('Login Gagal Periksa Koneksi Internet Anda');
        }
      })
    } else {
      this.authService.notifikasi('Username atau Password Tidak Boleh Kosong');
    }
  }
}