import React from 'react'
import { Menu } from './model/resturant'

interface OwnProps extends Omit<Menu,'price'>{
    showBestMenuName(name:string):string
}

//인터페이스는 extends

//타입은 아래 처럼 코드 재사용?
// type OwnProps = Menu & {
//     showBestMenuName(name:string):string
// }

const BestMenu:React.FC<OwnProps> = ({name, category,  showBestMenuName}) => {
  return (
    <div>{name}</div>
  )
}

export default BestMenu