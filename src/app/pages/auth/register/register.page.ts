import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup
  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private toastController: ToastController,
    private navCtrl: NavController,
    private alertService: AlertService,
    private formb:FormBuilder,
    private user:UserService
  ) { 
    this.registerForm=this.formb.group({
      nombre_completo: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      altura: ['120', [Validators.required]],
      peso: ['40', [Validators.required]],
      genero: ['FEMENINO'],
      cod_pais: ['591'],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]],
    })
  }

  ngOnInit() {
 
  }
  onSubmit(){
    console.log(this.registerForm.value);
    let data=this.registerForm.value
    this.user.register({
      nombre_completo:data.nombre_completo,
      fecha_nacimiento:data.fecha_nacimiento,
      genero:data.genero,
      altura:data.altura,
      peso:data.peso,
      email:data.altura,
      telefono:data.telefono,
      password:data.nombre_completo,
      password_confirmation:data.nombre_completo
    })
    .subscribe(data=>{
      console.log(data);
      
    },err=>{
      console.log(err);
      
    })
    
  }

  dismissRegister() {
    this.modalController.dismiss();
  }


  register(form) {
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

