import {Component, computed, inject, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-ttc',
  standalone: true,
  imports: [
    FormsModule,
    CurrencyPipe
  ],
  templateUrl: './ttc.component.html',
  styleUrl: './ttc.component.css'
})
export class TTCComponent {
  private router = inject(Router);

  VAT = signal(18);
  quantity = signal(1);
  HT = signal(0);

  unitTTC = computed(() => {
    const discount = this.getDiscount();
    const priceAfterDiscount = this.HT() * (1 - discount);
    return priceAfterDiscount + this.VAT();
  });

  TTC = computed(() => {
    return this.unitTTC() * this.quantity();
  });

  discount = computed(() => {
    return this.HT() * this.getDiscount() * this.quantity();
  });

  private getDiscount(): number {
    if (this.quantity() > 10 && this.quantity() <= 15) {
      return 0.2;
    } else if (this.quantity() > 15) {
      return 0.3;
    }
    return 0;
  }
}
