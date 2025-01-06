import React from 'react'
import { Address, Restaurant } from './model/resturant'

interface OwnProps {
    info:Restaurant
    //함수는 이런식으로 넘김
    changeAddress(address:Address):void//리턴 타입이 없을때는 void
}

const Store:React.FC<OwnProps>= (props) => {
    return(
        <div>Store</div>
    )
}

export default Store