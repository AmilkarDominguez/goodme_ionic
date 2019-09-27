import { Injectable } from '@angular/core';

import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

const { Camera } = Plugins;
@Injectable({
	providedIn: 'root'
})
export class PhotoService {

	constructor(
		private imagePicker: ImagePicker,
		private cropService: Crop,
		private file: File
	) { }
	imgCropUrl = []
	smallImg
	smallSize

	createThumbnail(base64) {
		return this.generateFromImage(base64, 200, 200, 0.5)
			.then(data => {
				this.smallImg = data;
				this.smallSize = this.getImageSize(this.smallImg);
				return { base64: data, size: this.getImageSize(this.smallImg), blob: this.dataURLtoBlob(data) }
			});
	}
	reducirImagen(base64) {
		return this.generateFromImage(base64, 1025, 1025, 1)
			.then(data => {
				this.smallImg = data;
				this.smallSize = this.getImageSize(this.smallImg);
				return { base64: data, size: this.getImageSize(this.smallImg), blob: this.dataURLtoBlob(data) }
			});
	}
	generateFromImage(img, MAX_WIDTH: number = 700, MAX_HEIGHT: number = 700, quality: number = 1): Promise<string> {
		return new Promise((resolve, reject) => {

			var canvas: any = document.createElement("canvas");
			var image = new Image();

			image.onload = () => {
				var width = image.width;
				var height = image.height;

				if (width > height) {
					if (width > MAX_WIDTH) {
						height *= MAX_WIDTH / width;
						width = MAX_WIDTH;
					}
				} else {
					if (height > MAX_HEIGHT) {
						width *= MAX_HEIGHT / height;
						height = MAX_HEIGHT;
					}
				}
				canvas.width = width;
				canvas.height = height;
				var ctx = canvas.getContext("2d");

				ctx.drawImage(image, 0, 0, width, height);

				// IMPORTANT: 'jpeg' NOT 'jpg'
				var dataUrl = canvas.toDataURL('image/jpeg', quality);

				resolve(dataUrl)
			}
			image.src = img;
		})
	}

	getImageSize(data_url) {
		var head = 'data:image/jpeg;base64,';
		return ((data_url.length - head.length) * 3 / 4 / (1024 * 1024)).toFixed(4);
	}
	dataURLtoBlob(dataURI) {
		// convert base64 to raw binary data held in a string
		var byteString = atob(dataURI.split(',')[1]);
		// separate out the mime component
		var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
		// write the bytes of the string to an ArrayBuffer
		var ab = new ArrayBuffer(byteString.length);
		var ia = new Uint8Array(ab);
		for (var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}
		// write the ArrayBuffer to a blob, and you're done

		var bb = new Blob([ab]);
		return bb;
	}
	async takePicture() {
		const image = await Camera.getPhoto({
			allowEditing: true,
			resultType: CameraResultType.DataUrl,
			correctOrientation: true,
			source: CameraSource.Photos
		});
		const imageUrl = image.dataUrl;
		//alert(JSON.stringify(image))
		return this.dataURLtoBlob(imageUrl)
	}
}
