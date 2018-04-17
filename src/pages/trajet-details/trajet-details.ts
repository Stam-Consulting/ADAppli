import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Trajet} from '../../models/AlloDakar-Trajet';
import { AlloDakarService } from '../../services/AlloDakarApi.service';
import { Reservation } from '../../models/Reservation';
/**
 * Generated class for the TrajetDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trajet-details',
  templateUrl: 'trajet-details.html',
})
export class TrajetDetailsPage {
  
   
   trajetstodetails : Trajet = new Trajet();
   newReservation : Reservation= new Reservation();
   nbplace : number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alloDakarService: AlloDakarService, public alertCtrl: AlertController) {

   console.log('le trajet : ' + this.navParams.get('letrajet'));
    this.trajetstodetails = this.navParams.get('letrajet');
  }


  ionViewDidLoad() {

    console.log('ionViewDidLoad TrajetDetailsPage');
  }

  goToReservation(trajet) {

    console.log(" trajet det" , trajet)

    let alert = this.alertCtrl.create({
      title: 'Reservation',
      
      message: 'Montant à Payer :'+ trajet.tarifvoy* this.nbplace,


      inputs:[
        {
          name: 'Votre Téléphone',
          placeholder: 'Votre numero Orange Money',
          type: 'number',
        },
      ],

  
     
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Continuer',
          handler: data => {
            this.newReservation.montantEncaisse = Number(trajet.tarifvoy * this.nbplace); 
            this.newReservation.trajetId = trajet.id;
            this.newReservation.nbplaceareserv = this.nbplace;
            this.alloDakarService.reserv(this.newReservation);
            console.log('Saved clicked');
          }
        }
      ]
    });
    
    alert.present();

    }

  }


