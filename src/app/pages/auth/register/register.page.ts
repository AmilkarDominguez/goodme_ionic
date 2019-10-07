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
    private user:UserService,
    private storage:NativeStorage
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
    let sub=this.authService.register({
      nombre_completo:data.nombre_completo,
      fecha_nacimiento:data.fecha_nacimiento.substr(0,9),
      genero:data.genero,
      altura:data.altura,
      peso:data.peso,
      email:data.email,
      telefono:data.telefono,
      password:data.password,
      password_confirmation:data.password_confirmation
    })
    .subscribe(data=>{
      console.log(data);
      let datos = data.data.register
      localStorage.setItem("tokenAuth", `${datos.token_type} ${datos.access_token}`)
      this.storage.setItem('token', `${datos.token_type} ${datos.access_token}`)
        .then(
          () => {
            console.log('Token Almacenado');
            this.authService.isLoggedIn=true
            sub.unsubscribe()
          })
      
    },err=>{
      console.log(err);
      
    })
    
  }

  dismissRegister() {
    this.modalController.dismiss();
  }


}

