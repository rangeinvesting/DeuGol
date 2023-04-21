import { Component, OnInit } from '@angular/core';
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
	appOverlay: any = document.getElementById('appOverlay');
	formLogin: any = new FormGroup ({
		email: new FormControl(),
		password: new FormControl()
	  });
	formRegister: any = new FormGroup ({
		fullname: new FormControl(),
		email: new FormControl(),
		password: new FormControl(),
		confirmPassword: new FormControl()
	  });
	submitted: any = false;

	constructor(private formBuilder: FormBuilder, private ev: EventsService, private auth: AuthService, private token: TokenStorageService) {}

	ngOnInit(): void {
		this.formLogin = this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required],
		});
		
		this.formRegister = this.formBuilder.group({
			fullname: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', Validators.required],
			confirmPassword: ['', Validators.required],
		});

		this.ev.on('showAuthModal', (data: any) => {
			this.isLoginShow = this.isLoginShow?false:true;
			this.tab = data.detail.mode ? data.detail.mode : 'login';
			this.appOverlay.classList.add('show');
		});
	}

	get f() {
		return this.formLogin.controls;
	}
	
	setTab(tab: any) {
		this.tab = tab;
	}

	closeLoginModal() {
		this.isLoginShow = false;
		this.appOverlay.classList.remove('show');
	}

	doLogin() {
		this.submitted = true;
		if (this.formLogin.invalid) {
			this.submitted = false;
			return;
		}
		this.ev.trigger('showLoader', true);
		this.auth.login(this.formLogin.value).subscribe((result: any) =>{
			this.submitted = false;
			this.token.saveUser(result);
			this.ev.trigger('showLoader', false);
			this.ev.trigger('logon', true);
			this.closeLoginModal();
		},
        (error: any) => {                              //Error callback
          console.error(error)
          this.submitted = false;
          this.ev.trigger('showLoader', false);
        });
	}
}