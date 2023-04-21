import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from './../../../services/utils/events.service';
import { AuthService } from '../../../services/auth/auth.service';
import { ProfileService } from './../../../services/profile/profile.service';
import { CepService } from './../../../services/common/cep.service';
import { ScoreService } from './../../../services/awards/score.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  title: any = "cloudsSorage";
  selectedFile: any;
  fb: any;
  downloadURL: any;

  userInfo: any;
  rotate: boolean = false;
  userEmptyFields: any;
  zipcodeFound: boolean = false;

  error: boolean = false;
  msgError: any;
  success: boolean = false;
  successTitle: any;
  successText: any;
  isValidForm: boolean = false;
  submitted: boolean = false;
  accountIsOk: boolean = false;

  formAccount: any = new FormGroup ({
    taxid: new FormControl(),
    dob: new FormControl(),
    cellphone: new FormControl(),
    zipcode: new FormControl(),
    address: new FormControl(),
    address_number: new FormControl(),
    address_neighborhood: new FormControl(),
    address_city: new FormControl(),
    address_state: new FormControl()
    });

  constructor(private router: Router, public afs: AngularFirestore, private storage: AngularFireStorage, public afAuth: AngularFireAuth, private formBuilder: FormBuilder, private ev: EventsService, private auth: AuthService, private profile: ProfileService, private cepService:CepService, private scoreService: ScoreService) { 
    this.userInfo = this.auth.me();
    this.userEmptyFields = this.profile.checkPendingUserData();
    this.userInfo.user.photoURL = this.userInfo.user.photoURL || `https://eu.ui-avatars.com/api/?name=${this.userInfo.user.displayName}&size=250`;
  }

  onChanges(): void {
    this.formAccount.valueChanges.subscribe((x:any) => {
        if(this.formAccount.invalid) {
        console.log(x)
        //isValidForm
      }
    })
  }

  formatCellPhone(e:any){
      var v=e.target.value.replace(/\D/g,"");
          v=v.replace(/^(\d\d)(\d)/g,"($1) $2"); 
          v=v.replace(/(\d{5})(\d)/,"$1-$2");   
      e.target.value = v;
  }

  formatTaxID(e:any){
      var v=e.target.value.replace(/\D/g,"");
          v=v.replace(/(\d{3})(\d)/,"$1.$2");
          v=v.replace(/(\d{3})(\d)/,"$1.$2");
          v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
      e.target.value = v;
  }

  formatZipCode(e:any){
      var v= e.target.value.replace(/\D/g,"")                
          v=v.replace(/^(\d{5})(\d)/,"$1-$2") 
      e.target.value = v;
  }

  isValidCPF(cpf: any) {
    if (typeof cpf !== 'string') return false
    cpf = cpf.replace(/[^\d]+/g, '')
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false
    cpf = cpf.split('').map((el: any) => +el)
    const rest = (count: any) => (cpf.slice(0, count-12).reduce( (soma: any, el: any, index: any) => (soma + el * (count-index)), 0 )*10) % 11 % 10
    return rest(10) === cpf[9] && rest(11) === cpf[10]
  }

  validateCEP(){
    if(!this.formAccount.value.zipcode){
      console.log('Digite o cep');
      return false;
    }
    this.cepService.buscar(this.formAccount.value.zipcode).subscribe((cep: any)=>{
      this.ev.trigger('showLoader', true);
      if(!cep.erro){
        this.zipcodeFound = true;
        this.formAccount.controls['address'].setValue(cep.logradouro);
        this.formAccount.controls['address_neighborhood'].setValue(cep.bairro);
        this.formAccount.controls['address_city'].setValue(cep.localidade);
        this.formAccount.controls['address_state'].setValue(cep.uf);
        setTimeout(()=>{
          this.ev.trigger('showLoader', false);
        },1000)
      }
    });
    return true;
  }

  updateAccountInfo(){
    this.submitted = true;
    if(this.formAccount.invalid) {
      this.error = true;
      this.msgError = 'Verifique se todos os campos foram preenchidos corretamente e tente novamente!';
      this.submitted = false;
      return false;
    }

     let { taxid, dob, cellphone, zipcode, address, address_number, address_neighborhood, address_city, address_state } = this.formAccount.value;

    this.ev.trigger('showLoader', true);

    if(!this.isValidCPF(taxid)){
      this.error = true;
      this.msgError = 'O CPF digitado é inválido, por favor forneça o CPF corretamente.';
      this.submitted = false;
      this.ev.trigger('showLoader', true);
      return false;  
    }

    this.afAuth.authState.subscribe(async(user: any) => {

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: any = {
      dob,
      docs:{
        taxid
      },
      cellphone,
      address:{
        zipcode,
        address,
        address_number,
        address_neighborhood,
        address_city,
        address_state
      }
    };
    return userRef.set(userData, {
      merge: true,
    }).then(()=>{
      this.ev.trigger('showLoader', false);
      this.success = true;
      this.successTitle = 'Dados atualizados com sucesso!';
      this.successText = 'Seus dados forma atualizados com sucesso, caso seja necessário iremos solicitar a verificação de identidade.';
      this.scoreService.setUserPoints(10, 'Completar cadastro', 'signup_completed');
      setTimeout(()=>{

      },3000)
    });

  });

    return;
  }

  updateProfilePhoto(photoURL: any){
    this.afAuth.authState.subscribe(async(user: any) => {

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: any = {
      photoURL
    };
    return userRef.set(userData, {
      merge: true,
    }).then(()=>{
      this.ev.trigger('showLoader', false);
      this.userInfo.user.photoURL = photoURL;
      this.scoreService.setUserPoints(10, 'Foto do perfil atualizada', 'photo_profile_updated');
     setTimeout(()=>{

      },3000)
    });

  });

  }

  ngOnInit(): void {
    this.formAccount = this.formBuilder.group({
      taxid: ['', Validators.required],
      dob: ['', Validators.required],
      cellphone: ['', Validators.required],
      zipcode: ['', Validators.required],
      address: ['', Validators.required],
      address_number: ['', Validators.required],
      address_neighborhood: ['', Validators.required],
      address_city: ['', Validators.required],
      address_state: ['', Validators.required],
    });

    try{
      let { user } = this.auth.me();
      if(user.docs.taxid && user.dob){
      this.accountIsOk = true;
      }
      this.formAccount.controls['taxid'].setValue(user.docs.taxid);
      this.formAccount.controls['dob'].setValue(user.dob);
      this.formAccount.controls['cellphone'].setValue(user.cellphone);
      if(user.address.zipcode){
        this.zipcodeFound = true;
        this.formAccount.controls['zipcode'].setValue(user.address.zipcode);
        this.formAccount.controls['address'].setValue(user.address.address);
        this.formAccount.controls['address_number'].setValue(user.address.address_number);
        this.formAccount.controls['address_neighborhood'].setValue(user.address.address_neighborhood);
        this.formAccount.controls['address_city'].setValue(user.address.address_city);
        this.formAccount.controls['address_state'].setValue(user.address.address_state);
      }
    }catch(e){

    }

    this.onChanges();
  }

  onFileSelected(event: any) {
    
    this.ev.trigger('showLoader', true);
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `accounts/profile_photos/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`accounts/profile_photos/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url: any) => {
            if (url) {
              this.fb = url;
              this.updateProfilePhoto(url);
            }

          });
        })
      )
      .subscribe((url:any) => {
 
      });
  }

}
