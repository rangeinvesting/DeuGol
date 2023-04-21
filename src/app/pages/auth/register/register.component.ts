import { Component, OnInit } from '@angular/core';
import { EventsService } from './../../../services/utils/events.service';
import { AuthService } from './../../../services/auth/auth.service';
import { TokenStorageService } from './../../../services/utils/token-storage.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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

  constructor(private formBuilder: FormBuilder, private ev: EventsService, private auth: AuthService, private token: TokenStorageService) {
    this.ev.trigger('showAuthModal', 'register');
  }

  ngOnInit(): void {

  }

  
}