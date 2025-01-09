export const increment = (value:number) => ({ 
  type: "INCREMENT" as const, //as const를 사용하여 type을 string이 아닌 string literal로 지정
  payload: value, 
});
export const decrement = (value:number) => ({
  type: "DECREMENT" as const,
  payload: value,
});
export const reset = () => ({ type: "RESET" as const, });

export type CounterAction =
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>
  | ReturnType<typeof reset>