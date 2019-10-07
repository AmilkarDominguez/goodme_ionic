import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user: User;

  constructor(private menu: MenuController, private authService: AuthService,
    private userservice:UserService
    ) { 
    this.menu.enable(true);
  }

  ngOnInit() {
    this.userservice.usuarios(10,"id nombre_completo",1)
    .subscribe(data=>{
      console.log(data.data.users.data);
    })
  }

  ionViewWillEnter() {
  }

}