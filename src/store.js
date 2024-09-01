import { createStore } from 'redux';

const initialStore = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

const reducer = (state = initialStore, action) => {
  switch (action.type) {
    case 'account/deposite':
      return {
        ...state,
        balance: state.balance + action.payLoad,
      };
    case 'account/withdraw':
      return {
        ...state,
        balance: state.balance - action.payLoad,
      };
    case 'account/requestLoan':
      if (state.loan > 0) return state;
      // LATER
      return {
        ...state,
        loan: action.payLoad.amount,
        loanPurpose: action.payLoad.purpose,
        balance: state.balance + action.payLoad.amount,
      };
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

store.dispatch({ type: 'account/deposite', payLoad: 500 });

console.log('hello redux', store.getState());

store.dispatch({ type: 'account/withdraw', payLoad: 200 });

console.log('hello redux', store.getState());

store.dispatch({
  type: 'account/requestLoan',
  payLoad: { amount: 1000, purpose: 'buy a car' },
});

console.log('hello redux', store.getState());

store.dispatch({
  type: 'account/payLoan',
});

console.log('hello redux', store.getState());
