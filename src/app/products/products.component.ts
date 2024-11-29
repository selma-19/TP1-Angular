import { Component } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  concatMap,
  map,
  takeWhile,
  scan,
} from "rxjs";
import { Product } from "./dto/product.dto";
import { ProductService } from "./services/product.service";
import { Settings } from "./dto/product-settings.dto";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
  standalone: true,
  imports: [AsyncPipe]
})
export class ProductsComponent {
  private settingsSubject = new BehaviorSubject<Settings>({
    limit: 12,
    skip: 0
  });
  
  products$: Observable<Product[]>;
  private totalProducts = 0;

  constructor(private productService: ProductService) {
    this.products$ = this.settingsSubject.pipe(
      concatMap(settings => 
        this.productService.getProducts(settings).pipe(
          map(response => {
            this.totalProducts = response.total;
            return response.products;
          }),
          takeWhile(products => products.length > 0, true)
        )
      ),
      scan((acc, products) => [...acc, ...products], [] as Product[])
    );
  }

  loadMoreProducts() {
    const currentSettings = this.settingsSubject.value;
    const nextSkip = currentSettings.skip + currentSettings.limit;
    
    if (nextSkip < this.totalProducts) {
      this.settingsSubject.next({
        limit: currentSettings.limit,
        skip: nextSkip
      });
    }
  }
}