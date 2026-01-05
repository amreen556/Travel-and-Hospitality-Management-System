# TODO: Update Frontend Cart to Use Backend OrderBasket

## Tasks
- [x] Update AuthService to store userId from login response
- [x] Create Angular models for OrderBasket, OrderBasketItem, and DTOs
- [x] Update CartItem model to match OrderBasketItem structure
- [x] Update CartService to use API calls instead of localStorage
  - [x] Inject HttpClient and AuthService
  - [x] Add initializeCart method to get/create OrderBasket
  - [x] Update addToCart to add OrderBasketItem via API
  - [x] Update updateQuantity to update item via API
  - [x] Update removeFromCart to delete item via API
  - [x] Update clearCart to delete all items via API
  - [x] Update getCartItems to load from API
- [x] Update hotel-list-user.component to pass correct data for CartItem
- [x] Update cart.component to handle new CartItem structure and async operations
- [x] Fix API endpoints to match backend (use /orderbasket/{id} for loading items)
- [x] Test the integration and fix any issues

## Payment Flow Fix
- [x] Add makePayment method in CartService to call backend Payment2/payment API
- [x] Add completeOrder method in CartService to call backend Payment2/complete-order API
- [x] Update payment.component.ts to use real backend APIs instead of simulating payment
- [x] Handle real transaction ID from backend response

## Order Page
- [x] Create OrderComponent to display past orders
- [x] Add getOrdersByEmail method in CartService to fetch orders from backend
- [x] Add route for /orders in app-routing.module.ts
- [x] Add Orders link in navigation bar near login button
- [x] Declare OrderComponent in app.module.ts
