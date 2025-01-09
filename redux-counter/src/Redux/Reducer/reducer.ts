import { CounterAction } from "../Actions/actions";

//초기 상태
const initialState = { count: 0 };

//Reducer
export const counterReducer = (
  state = initialState,
  action: CounterAction
) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + action.payload };
    case "DECREMENT":
      return { count: state.count - action.payload };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
};
