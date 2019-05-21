import { Component, OnInit } from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {AuthService} from '../../../service/auth.service';
import {AlertService} from '../../../service/alert.service';
import {LoginPage} from '../login/login.page';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private modalController: ModalController,
              private authService: AuthService,
              private navCtrl: NavController,
              private alertService: AlertService
  ) { }
  ngOnInit() {
  }
  // Dismiss Register Modal
  dismissRegister() {
    this.modalController.dismiss();
  }
  // On Login button tap, dismiss Register modal and open login Modal
  async loginModal() {
    this.dismissRegister();
    const loginModal = await this.modalController.create({
      component: LoginPage,
    });
    return await loginModal.present();
  }
  register(form: NgForm) {
    this.authService.register(form.value.fName, form.value.lName, form.value.email, form.value.password).subscribe(
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
          this.alertService.presentToast(data[`message`]);
        },
        error => {
          console.log(error);
        },
        () => {

        }
    );
  }

}
