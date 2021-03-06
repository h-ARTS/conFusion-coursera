import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMsg: string;
  promoErrMsg: string;
  leaderErrMsg: string;

  constructor(private dishservice: DishService,
              private promotionserivce: PromotionService,
              private leaderservice: LeaderService,
              @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
      .subscribe(dish => this.dish = dish,
                 disherrmsg => this.dishErrMsg = <any>disherrmsg);
    this.promotionserivce.getFeaturedPromotion()
      .subscribe(promotion => this.promotion = promotion,
                 promoerrmsg => this.promoErrMsg = promoerrmsg);
    this.leaderservice.getFeaturedLeader()
      .subscribe(leader => this.leader = leader,
                 leadererrmsg => this.leaderErrMsg = leadererrmsg);
  }

}
