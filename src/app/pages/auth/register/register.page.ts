import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  myForm: FormGroup
  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private toastController: ToastController,
    private navCtrl: NavController,
    private alertService: AlertService,
    private formb:FormBuilder
  ) { 
    this.myForm = this.formb.group({
      nombre_completo: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(12)]],
      fechanac: ['', [Validators.required]],
      peso: ['', [Validators.required]],
      altura: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }


  dismissRegister() {
    this.modalController.dismiss();
  }

  
  async loginModal() {
    this.dismissRegister();
    const loginModal = await this.modalController.create({
      component: LoginPage,
    });
    return await loginModal.present();
  }

  register(form: NgForm) {
    this.authService.register(form.value.fName, form.value.email, form.value.password).subscribe(
      data => {
        this.authService.login(form.value.email, form.value.password).subscribe(
          data => {
          },
          error => {
            console.log(error);
          },
          () => {
            this.dismissRegister();
            this.navCtrl.navigateRoot('/dashboard');
          }
        );
        this.alertService.presentToast(data['message']);
      },
      error => {
        console.log(error);
      },
      () => {
        
      }
    );
  }
}

