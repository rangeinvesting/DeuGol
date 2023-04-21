import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth) {

  }

  getBadge(){

  }

  getLevel(points: any){

    var userLevel: any = '';

    const userLevelData = [];
    userLevelData[0] = {name:'Várzea I', badge: '/assets/images/badges/varzea.png'};
    userLevelData[100] = {name:'Várzea II', badge: '/assets/images/badges/varzea.png'};
    userLevelData[200] = {name:'Aspirante', badge: '/assets/images/badges/aspirante.png'};
    userLevelData[300] = {name:'Juvenil', badge: '/assets/images/badges/juvenil.png'};
    userLevelData[400] = {name:'Amador', badge: '/assets/images/badges/amador.png'};
    userLevelData[500] = {name:'Profissional', badge: '/assets/images/badges/profissional.png'};
    userLevelData[600] = {name:'Lenda', badge: '/assets/images/badges/lenda.png'};
    userLevelData[700] = {name:'Galáctico', badge: '/assets/images/badges/galatico.png'};
    userLevelData[800] = {name:'Vidente', badge: '/assets/images/badges/vidente.png'};
    userLevelData[1000] = {name:'Profeta', badge: '/assets/images/badges/profeta.png'};

    for (var i = 0; i < parseInt(points); i++) {
      if(userLevelData[i]){
        userLevel = userLevelData[i];
      }
    }

    return userLevel
    
  }

  getScore(uid: any){
    const scoreRef: AngularFirestoreDocument<any> = this.afs.doc(`scores/${uid}`);
    return scoreRef;
  }

  setUserPoints(_points: number, desc: any, awardCode: any){

    var _awards: any = {};

    this.afAuth.authState.subscribe(async(user: any) => {
      this.afs.collection(`scores`, ref => ref.where('useruid','==', user.uid).limit(1)).get().subscribe((snapshot: any) => {
         snapshot.forEach((doc: any) => {
            console.log(doc.id, " => ", doc.data());

            let { points, cumulativePoints, awards } = doc.data();

            const scoreRef = this.getScore(doc.id);

            if(awards[awardCode]){
              return false;
            }

            _awards[awardCode?awardCode:this.generateUID()] = {
              badge: null,
              date: Date.now(),
              desc: desc,
              points: _points
            }

            points = parseInt(points + _points);
            cumulativePoints = parseInt(cumulativePoints + _points);

            scoreRef.set({ awards: _awards, points, cumulativePoints, expire_points: Date.now() }, {
              merge: true,
            }).then(()=>{
              console.log('Score saved')
            })

            return;

        });
      });
    });
  }

  generateUID(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  getUserPoints(cb: any){
    this.afAuth.authState.subscribe(async(user: any) => {
      this.afs.collection(`scores`, ref => ref.where('useruid','==', user.uid).limit(1)).valueChanges().subscribe((data: any) => {
            cb(data[0]);
         data.forEach((doc: any) => {
          console.log(doc.id)
          })
       });
    });
  }
}
