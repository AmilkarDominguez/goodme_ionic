import { Component, OnInit } from '@angular/core';
//servicios
import { UserService } from '../services/user.service';
import { PhotoService } from '../services/photo.service';

//capacitor
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

	constructor(private user: UserService,
		private foto: PhotoService
	) { }
	ngOnInit(): void {
		let sub = this.user.usuarios(2, "id nombre_completo")
			.subscribe(res => {
				let datos = res.data.user
				console.log(res);
				sub.unsubscribe()
			}, err => {
				console.log(err);
			})
	}
	onClick() {
		let sub = this.user.login("daniel@gmail.com", "123123123")
			.subscribe(res => {
				let datos = res.data.login
				console.log(res);
				alert(JSON.stringify(datos))
				localStorage.setItem("tokenAuth", `${datos.token_type} ${datos.access_token}`)
				sub.unsubscribe()
			}, err => {
				console.log(err);
			})

	}
	subirimg(ev) {
		//console.log(ev);
		let img: any = ev;
		if (img.length > 0) {
			this.user.upload(img[0]).subscribe(res => {
				console.log(res);
			}, err => {
				console.log(err);
			})
		}
	}
	escojerfoto() {
		this.foto.takePicture()
			.then(data => {
				this.user.upload(data).subscribe(res => {
					console.log(res);
					alert(JSON.stringify(res))
				}, err => {
					alert(JSON.stringify(err));
				})
			})
	}
}
