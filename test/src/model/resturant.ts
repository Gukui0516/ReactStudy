// let data = { //객체형 타입은 타입을 만들어야함
//     name: '누나네 식당',
//     category:'western',
//     address: {
//       city:'jeju',
//       detail:'somewhere',
//       zipCode:234213123
//     },
//     menu:[{name:"rose pasta",price:2000,cateory:"PASTA"},{name:"garlic steak",price:3000,cateory:"STEAK"}]
//   }

import exp from "constants";

export type Restaurant = { //<<< 이런식으로 타입 정의 해줘야함!
    name:string;
    category:string;
    address:Address; //이런식으로 타입 만든거 안에 타입 지정 가능
    menu:Menu[]
}


export type Address = {
    city:string;
    detail:string;
    zipCode?:number; //?는 있을수도 있고 없을수도 있을때 사용, 주의해야함!
}

export type Menu = {
    name:string;
    price:number;
    category:string;
}

export type AddressWithoutZip = Omit<Address, 'zipCode'> //타입에서 빼고싶을때 Omit사용
export type RestaurantOnlyCategory = Pick<Restaurant, 'category'>//타입에서 선택하고 싶을때 Pick사용

//api 받을때 타입사용, T는 제네릭
export type ApiResponse<T> = {
    data:T[],
    totalPage:number,
    page:number
}

export type RestaurantResponse = ApiResponse<Restaurant> //<-- 이런식으로 사용 가능
export type MenuResponse = ApiResponse<Menu>