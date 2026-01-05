// export interface OrderBasket {
//   id: string;
//   userId: string;
//   createdDate: Date;
//   updatedDate: Date;
//   items: OrderBasketItem[];
// }

// export interface OrderBasketItem {
//   id: string;
//   orderBasketId: string;
//   productId: string;
//   quantity: number;
//   unitPrice: number;
//   addedDate: Date;
//   type: 'hotel' | 'flight'; 
// }

// export interface CreateOrderBasketDto {
//   userId: string;
// }

// export interface CreateOrderBasketItemDto {
//   orderBasketId: string;
//   productId: string;
//   quantity: number;
//   unitPrice: number;
//   type: item.type; // 
// }

// export interface UpdateOrderBasketItemDto {
//   productId: string;
//   quantity: number;
//   unitPrice: number;
//   type:item.type;
// }


export interface OrderBasket {
  id: string;
  userId: string;
  createdDate: Date;
  updatedDate: Date;
  items: OrderBasketItem[];
}

export interface OrderBasketItem {
  id: string;
  orderBasketId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  addedDate: Date;
  type: 'hotel' | 'flight' | 'package'; // ✅ Correct usage
}

export interface CreateOrderBasketDto {
  userId: string;
}

export interface CreateOrderBasketItemDto {
  orderBasketId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  type: 'hotel' | 'flight' | 'package'; // ✅ Fix: use string literal type, not `item.type`
}

export interface UpdateOrderBasketItemDto {
  productId: string;
  quantity: number;
  unitPrice: number;
  type: 'hotel' | 'flight' | 'package'; // ✅ Fix: same here
}

