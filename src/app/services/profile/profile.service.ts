import { Injectable } from '@angular/core';
import { AuthService } from './../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private auth: AuthService) {
    console.log(this.auth.me())
  }


  profileRequiredFields(field: any){
  let RequiredFields = [
        "dob",
        "taxid_photo",
        "taxid",
        "emailVerified",
        "address_city",
        "address",
        "address_number",
        "zipcode",
        "address_neighborhood",
        "address_state"];
        return (RequiredFields[field]);
  }
    
  checkPendingUserData(){
      let userData = this.auth.me();

        let emptyFields = 0;
        let addressIsEmpty = Object.keys(userData.user.address).every(function(x) { 
          if(userData.user.address[x]===''|| userData.user.address[x]===null){
            emptyFields = emptyFields + 1;
          }
          return emptyFields;
        })

        let docsEmpty = Object.keys(userData.user.docs).every(function(x) { 
          if(userData.user.docs[x]===''|| userData.user.docs[x]===null){
            emptyFields = emptyFields + 1;
          }
          return emptyFields;
        })

      return {addressIsEmpty, docsEmpty, totalEmptyFields: emptyFields, emailVerified: userData.user.emailVerified, cellphone: (userData.user.cellPhone)};
  }

}
