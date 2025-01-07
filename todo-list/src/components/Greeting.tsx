import React from 'react'

// interface GreetingProps {
//     name: string;
// }

type GreetingProps = {
    name: string;
}

const Greeting:React.FC<GreetingProps> = ({name}) => {
  return  <h1>Hello! {name}!</h1>;
}

export default Greeting;