import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../image-processing.service';
import { map } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {

  constructor(private productService :  ProductService,
    public imageDialog : MatDialog,
    private imageProcessingService : ImageProcessingService,
    private router :Router,
    ) { }
  products: Product[] = [];
  showTable = false
  showLoadMoreProduct = false;
  displayedColumns: string[] = ['Id','Product Name', 'description', 'Product Actual Price','Product Discounted Price','Actions'];
  pageNumber : number = 0;

  ngOnInit(): void {
  this.getAllProducts();
  }

  searchByKeyword(searchKey: string) {
    console.log(searchKey);
    this.pageNumber = 0;
    this.products = [];
    this.getAllProducts(searchKey);
  }

  public getAllProducts(searchKey : string ="") {
    this.showTable= false;
    this.productService.getAllProducts(this.pageNumber,searchKey)
    .pipe(
      map((products: Product[]) => products.map((product: Product) => this.imageProcessingService.createImages(product)))
      )
    .subscribe(
      (response : Product []) => {
        // for(let i =0;i<response.length; i ++){
        //   this.imageProcessingService.createImages(response[i]);
        // }
       console.log(response);
       if(response.length == 4){
        this.showLoadMoreProduct = true;
       }else{
        this.showLoadMoreProduct = false;
       }
       response.forEach(product=>this.products.push(product));
      //  this.products = response;/
        this.showTable = true;
      console.log("jaydeep"+this.products);
      },(error : HttpErrorResponse) =>{
        console.log(error);
      });
  }

  deleteProduct(productId :number) {
    this.productService.deleteProducts(productId).subscribe(
      (response) => {
        console.log(response);
      this.getAllProducts();
      },(error : HttpErrorResponse) =>{
        console.log(error);
      }
    );
  }


  editProduct(productId :number) {
    console.log(productId);
    this.router.navigate(['/addNewProduct',{productId :productId}]);  
    }


  showImages(product : Product) {
    this.imageDialog.open(ShowProductImagesDialogComponent, {
      data : {
        images : product.productImages
      },
      height:'500px',
      width : '800px'
    });
  }
  loadMoreProduct(){
  this.pageNumber = this.pageNumber +1;
  this.getAllProducts();
  }
}

