import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/service/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  private readonly _ActivatedRoute=inject(ActivatedRoute);
  private readonly _ProductsService=inject(ProductsService);
  detailsProduct:IProduct| null=null;
  getSpecificProducts: any;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(P)=>{
       let IdProduct = P.get('IdOfProudect')

       //logic api  call 
       this._ProductsService.getSpecificProducts(IdProduct).subscribe({
        next:(res)=>{
         // console.log(res.data)
        this.detailsProduct = res.data
        },
        error:(err)=>{
          console.log(err)
        }
       })

      }
    })
   }
   ngOnDestroy(): void {
    // unsubscribe
    this.getSpecificProducts?.unsubscribe()
 
   }
  

}
