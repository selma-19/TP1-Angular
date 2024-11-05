import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API } from "src/config/api.config";
import { Settings } from "../dto/product-settings.dto";
import { ProductApiResponse } from "../dto/product-api-response.dto";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getProducts(setting: Settings) {
    const { limit, skip } = setting;
    return this.http.get<ProductApiResponse>(
      `${API.products}?limit=${limit}&skip=${skip}`
    );
  }
}
