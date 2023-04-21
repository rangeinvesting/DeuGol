import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { EventsService } from './../../../services/utils/events.service';
import { AuthService } from './../../../services/auth/auth.service';
import { TokenStorageService } from './../../../services/utils/token-storage.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'auth-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	isLoginShow: boolean = false;
	tab: any = 'login';
	referrer: any;
	referrerName: any;
	bonus: any;
	error: boolean = false;
	msgError: any;
	appOverlay: any = document.getElementById('appOverlay');
	body: any = document.querySelector('body');

	formLogin: any = new FormGroup ({
		email: new FormControl(),
		password: new FormControl()
	  });

	formVerify: any = new FormGroup ({
		emailCode: new FormControl()
	  });

	formForgotPassword: any = new FormGroup ({
		email: new FormControl()
	  });

	formRegister: any = new FormGroup ({
		fullname: new FormControl(),
		email: new FormControl(),
		password: new FormControl(),
		confirmPassword: new FormControl()
	  });

	submitted: boolean = false;
	tos: boolean = false;
	successTitle: any;
	successText: any;

	constructor(private formBuilder: FormBuilder, public afs: AngularFirestore, private ev: EventsService, private auth: AuthService, private token: TokenStorageService) {}

	async getSignUpBonus(cb: any){
		this.afs.collection(`bonus`, ref => ref.limitToLast(1).orderBy("expire_at")).valueChanges().subscribe((data: any) => {
			if(typeof cb === 'function'){
				cb(data[0]);
			}
		});
	}

	async getSignUpSpecificBonus(uid: any, cb: any){
		this.afs.collection(`bonus`).doc(uid).valueChanges().subscribe((data: any) => {
			if(typeof cb === 'function'){
				cb(data);
			}
		});
	}

	async getReffererBonus(uid: any, cb: any){
		this.afs.collection(`users`).doc(uid).valueChanges().subscribe((referrer: any) => {	
			this.afs.collection(`bonus`, ref => ref.where('allowRefferrer','==', 'yes' ).limit(1)).valueChanges().subscribe((data: any) => {
				if(typeof cb === 'function'){
					cb(data[0], referrer);
				}
			});
		});
	}

	ngOnInit(): void {
		this.formLogin = this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required],
		});

		this.formVerify = this.formBuilder.group({
			emailCode: ['', Validators.required]
		});

		this.formForgotPassword = this.formBuilder.group({
			email: ['', Validators.required]
		});
		
		this.formRegister = this.formBuilder.group({
			fullname: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', Validators.required],
			confirmPassword: ['', Validators.required],
		});

		this.ev.on('showAuthModal', (data: any) => {
			setTimeout(()=>{
				//this.ev.trigger('showLoader', false);
			},1000);
			this.isLoginShow = this.isLoginShow?false:true;
			this.tab = data.detail.mode ? data.detail.mode : 'login';
			this.appOverlay.classList.add('show');
			this.body.classList.add('noScroll');
			if(!data.detail.refType){
					this.referrer = false;
					this.getSignUpBonus((data: any) => {
						this.bonus = data.bonus;
					})
			}

			if(data.detail.refType == 'bonus'){
				this.referrer = false;
					this.getSignUpSpecificBonus(data.detail.ref, (data: any) => {
						this.bonus = data.bonus;
					})
			}

			if(data.detail.refType == 'referrer'){
				this.referrer = true;
				this.getReffererBonus(data.detail.ref, (data: any, referrer: any) => {
						this.referrerName = referrer.displayName;
						this.bonus = data.bonus;
					})
				
			}

			if(typeof data.detail.cb === 'function'){
				data.detail.cb()
			}
		});
	}

	get f() {
		return this.formLogin.controls;
	}
	
	setTab(tab: any) {
		this.error = false;
		this.msgError = null;
		this.tab = tab;
	}

	tosRead(){
		this.tos = this.tos?false:true;
	}

	closeLoginModal() {
		this.isLoginShow = false;
		this.appOverlay.classList.remove('show');
		this.body.classList.remove('noScroll');
	}

	doForgotPassword(){

		this.submitted = true;
		if(this.formForgotPassword.invalid) {
			this.error = true;
			this.msgError = 'Verifique se todos os campos foram preenchidos corretamente e tente novamente!';
			this.submitted = false;
			return;
		}

		this.ev.trigger('showLoader', true);

		var { email } = this.formForgotPassword.value;

		this.auth.ForgotPassword(email, (result: any) =>{
			this.submitted = false;
			this.ev.trigger('showLoader', false);
			//this.setTab('verify-email');
			this.error = false;
			this.msgError = null;
			this.successTitle = 'Pronto!';
			this.successText = `Enviamos um link de redefinição de senha para o email ${email}, acesse seu e-mail e crie uma nova senha!`;
			this.setTab('success');
		},
		(error: any) => {                              //Error callback
			console.error(error)
				this.submitted = false;
				this.error = true;
				this.msgError = error.msg;
				this.ev.trigger('showLoader', false);
		});

	}

	doRegister(){
		this.submitted = true;
		if(this.formRegister.invalid) {
			this.error = true;
			this.msgError = 'Verifique se todos os campos foram preenchidos corretamente e tente novamente!';
			this.submitted = false;
			return;
		}

		this.ev.trigger('showLoader', true);


		let user = this.formRegister.value;
		user.lastBonus = this.bonus;

		this.auth.SignUp(this.formRegister.value, (result: any) =>{
			this.submitted = false;
			this.ev.trigger('showLoader', false);
			this.ev.trigger('logon', true);
			//this.setTab('verify-email');
			this.closeLoginModal();
		},
		(error: any) => {                              //Error callback
			console.error(error)
				this.submitted = false;
				this.error = true;
				this.msgError = error.msg;
				this.ev.trigger('showLoader', false);
		});
	}

	doLogin() {
		this.submitted = true;
		if (this.formLogin.invalid) {
			this.error = true;
			this.msgError = 'Verifique se todos os campos foram preenchidos corretamente e tente novamente!';
			this.submitted = false;
			return;
		}
		this.ev.trigger('showLoader', true);
		this.auth.SignIn(this.formLogin.value, (result: any) =>{
			this.submitted = false;
			this.ev.trigger('showLoader', false);
			this.ev.trigger('logon', true);
			this.closeLoginModal();
		},
        (error: any) => {                              //Error callback
          console.error(error)
          this.submitted = false;
          this.error = true;
					this.msgError = error.msg;
          this.ev.trigger('showLoader', false);
        });
	}
}