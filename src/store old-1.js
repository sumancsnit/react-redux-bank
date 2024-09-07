import { combineReducers, createStore } from 'redux';

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
};

const accountReducer = (state = initialStateAccount, action) => {
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

const customerReducer = (state = initialStateCustomer, action) => {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payLoad.fullName,
        nationalID: action.payLoad.nationalID,
        createdAt: action.payLoad.createdAt,
      };
    case 'customer/updateName':
      return {
        ...state,
        fullName: action.payLoad,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

const deposit = (amount) => {
  return { type: 'account/deposite', payLoad: amount };
};

const withdraw = (amount) => {
  return { type: 'account/withdraw', payLoad: amount };
};

const requestLoan = (amount, purpose) => {
  return {
    type: 'account/requestLoan',
    payLoad: { amount, purpose },
  };
};

const payLoan = () => {
  return {
    type: 'account/payLoan',
  };
};

store.dispatch(deposit(750));
store.dispatch(withdraw(250));
store.dispatch(requestLoan(1000, 'buy a car'));
store.dispatch(payLoan());

const createCustomer = (fullName, nationalID) => {
  return {
    type: 'customer/createCustomer',
    payLoad: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
};

const updateName = (fullName) => {
  return {
    type: 'customer/updateName',
    payLoad: fullName,
  };
};

store.dispatch(createCustomer('Veda S', 25425175844));
store.dispatch(updateName('Vedansh Suman'));

// console.log('hello redux', store.getState());
