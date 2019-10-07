import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController, Platform, NavController, ToastController } from '@ionic/angular';
//import { RegisterPage } from '../auth/register/register.page';
//import { LoginPage } from '../auth/login/login.page';
import { AuthService } from 'src/app/services/auth.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private menu: MenuController,
    private authService: AuthService,
    private navCtrl: NavController,
    private storage: NativeStorage,
    private platform: Platform,
    public userservice:UserService
  ) { 
    this.menu.enable(false);
  }

  

  ionViewWillEnter() {
    this.authService.getToken().then(() => {
      if(this.authService.isLoggedIn) {
        this.navCtrl.navigateRoot('/dashboard');
      }
    });
  }

  ngOnInit() {
    this.userservice.usuarios(10,"id nombre_completo",1)
    .subscribe(data=>{
      console.log(data);
      
    })
  }

  async register() {
  }

  async login() {
  }
}
