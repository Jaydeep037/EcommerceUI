import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_auth/auth.guard';
import { ShowProductDetailsComponent } from './show-product-details/show-product-details.component';
import { ProductService } from './_services/product.service';
import { ProductResolveService } from './product-resolve.service';
import { ProductViewDetailsComponent } from './product-view-details/product-view-details.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { BuyProductResolverService } from './buy-product-resolver.service';
import { PlaceorderConfirmationComponent } from './placeorder-confirmation/placeorder-confirmation.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'products', component: ShowProductDetailsComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  {
    path: 'addNewProduct', component: AddNewProductComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] },
    resolve: {
      product: ProductResolveService
    }
  },
  {
    path: 'productViewDetails', component: ProductViewDetailsComponent,
    resolve: {
      product: ProductResolveService
    }
  },
  {
    path: 'buyProduct', component: BuyProductComponent, canActivate: [AuthGuard], data: { roles: ['User'] },
    resolve: {
      productDetails: BuyProductResolverService
    }
  },
  { path: 'confirmation', component: PlaceorderConfirmationComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
  { path: 'register', component: RegisterComponent },
  {path : 'newCart',component:ProductViewDetailsComponent,canActivate:[AuthGuard],data:{roles :['User']}},
  {path : 'getCartDetails',component:CartComponent,canActivate:[AuthGuard],data:{roles :['User']}},
  { path: 'myorders', component: MyOrdersComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
  { path: 'orderInformation', component: OrderDetailsComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
