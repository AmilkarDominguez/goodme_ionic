import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { AuthPayload } from 'src/app/models/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm:FormGroup
  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
     public formb: FormBuilder,
     private user:UserService
  ) {
    this.loginForm=this.formb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
   }

  ngOnInit() {
  }

  // Dismiss Login Modal


  // On Register button tap, dismiss login modal and open register modal
  async registerModal() {
    const registerModal = await this.modalController.create({
      component: RegisterPage
    });
    return await registerModal.present();
  }

  onSubmit(){
    console.log(this.loginForm.value);
    let sub = this.authService.login(this.loginForm.value)
			.subscribe((res) => {
        let data=res.data.login
        console.log(res,data);
        this.authService.isLoggedIn=true
				localStorage.setItem("tokenAuth", `${data.token_type} ${data.access_token}`)
        sub.unsubscribe()
        this.navCtrl.navigateRoot('/dashboard');
			}, err => {
				console.log(err);
			})
  }


}
