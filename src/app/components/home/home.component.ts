import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/service/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../core/service/category.service';
import { Icategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink, TitleStrategy } from '@angular/router';
import { CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink,UpperCasePipe, LowerCasePipe,TitleCasePipe,SlicePipe,CurrencyPipe,DatePipe, JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoryService = inject(CategoryService);
  public productList: IProduct[] = []; // Initialize productList as an empty array
  categoriesList:Icategory[]=[];
  getAllProductSub!:Subscription;
  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
   items:1,
    nav: true
  }
  customOptionsCategories: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }
  ngOnInit(): void {
    this._CategoryService.getAllCatigory().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.categoriesList=res.data;
        
      },
      error:(err)=>{
          console.log(err)
      }

    })
this.getAllProductSub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.productList = res.data as IProduct[]; // Ensure that the response is cast to IProduct[]
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  ngOnDestroy(): void {
   // unsubscribe
   this.getAllProductSub?.unsubscribe()
  }
}
