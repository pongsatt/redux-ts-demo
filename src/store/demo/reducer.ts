import { Constants, DemoActions, IDemoState } from './types';

const init: IDemoState = {
  list: [],
  loading: false
};

export function demoReducer(state: IDemoState = init, action: DemoActions): IDemoState {
  switch (action.type) {
    case Constants.ADD_ITEM:
      return {...state, list: [...state.list, action.payload.item]};
    case Constants.SET_LOADING:
      return {...state, ...action.payload};
    default:
      return state;
  }
}