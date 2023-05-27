import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { EventsService } from './../../../services/utils/events.service';
import { AuthService } from './../../../services/auth/auth.service';

export interface PromoBanners {
  text:string;
  actionText:string;
  action:string;
  image: any;
  bg: any;
  textColor: any;
}


@Component({
  selector: 'promo-banner',
  templateUrl: './promo-banner.component.html',
  styleUrls: ['./promo-banner.component.css']
})
export class PromoBannerComponent implements OnInit {

  promoBanners: PromoBanners[] = [];

  curPage: number;
  pageSize: number;
  loading: boolean = false;
  haveBanners: boolean = false;

  constructor(private router: Router, private ev: EventsService, public afs: AngularFirestore, private auth: AuthService) { 
    this.curPage = 0;
    this.pageSize = 1; // any page size you want
    this.getPromoBanners();
  }

  goto(url: any){
      this.router.navigate([url]);
  }

  openRegisterModal(refType: any, ref: any){
    this.ev.trigger('showAuthModal', { mode: 'register', refType, ref});
  }

  setAction(action: any){

    //this.ev.trigger('showLoader', true);

    try{
      let _action = JSON.parse(action);
      if(_action.action == 'openRegisterModal'){
        return this.openRegisterModal(_action.refType, _action.ref);
      }
    }catch(e){
      console.log('No action')
    }
  }

  getTextColor(color: any){
    return `color:${color?color:'#fff'};`
  }

  getPromoBanners(){
      this.afs.collection(`bonus`).valueChanges().subscribe((data: any) => {

           this.promoBanners = data.map((bonus: any, index:Number) => {

            if(!bonus.showfor_logged_user && this.auth.isLogged()){
              return [];
            }

            if(!bonus.promoBanner){
              return [];
            }
              return {
                text: bonus.desc,
                actionText:bonus.actionText,
                action: bonus.action,
                image: bonus.banner,
                bg: bonus.bannerBg,
                textColor: this.getTextColor(bonus.textColor)
              }
            });
           
           if(this.promoBanners[0].text){
            this.haveBanners = true;
           }
           console.log(this.haveBanners, this.promoBanners, this.promoBanners.length)
      });
  }

  ngOnInit(): void {
  }

   numberOfPages() {
      return Math.ceil(this.promoBanners.length / this.pageSize);
    }
  
  setCurPage(page: number){
    
    let totalItems = this.promoBanners.length;
    let cursorPage = (page+1);

    if(totalItems < 2){
      return false;
    }
    
    this.loading = true;
    
    if(cursorPage>totalItems){
      page = 0;
    }
    
    if(cursorPage<1){
      page = (totalItems-1);
    }
    
    //console.log('Banners', page, cursorPage, totalItems, this.curPage)
    setTimeout(()=>{
      this.loading = false;
      this.curPage = page;
    }, 1000);
    return true;
  }
  
  getCurrentPromoBanners(){
    return [this.promoBanners[this.curPage]];
  }



}
