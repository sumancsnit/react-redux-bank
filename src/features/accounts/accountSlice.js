const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

const accountReducer = (state = initialStateAccount, action) => {
  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case 'account/withdraw':
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case 'account/requestLoan':
      if (state.loan > 0) return state;
      // LATER
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };
    case 'account/convertingCurrency':
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

const deposit = (amount, currency) => {
  if (currency === 'USD') return { type: 'account/deposit', payload: amount };
  // if function is returned instead of {}, redux will use thunk middleware
  // dispatch and getState will be accessable in this fn
  return async (dispatch, getState) => {
    // first dispatch to show loader
    dispatch({ type: 'account/convertingCurrency' });
    // API Call
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
      );
      const data = await res.json();
      const converted = data.rates.USD;
      // second dispatch to load actual data from api
      dispatch({ type: 'account/deposit', payload: converted });
    } catch (error) {
      console.log('currency api error:', error);
    }

    // Return action
  };
};

const withdraw = (amount) => {
  return { type: 'account/withdraw', payload: amount };
};

const requestLoan = (amount, purpose) => {
  return {
    type: 'account/requestLoan',
    payload: { amount, purpose },
  };
};

const payLoan = () => {
  return {
    type: 'account/payLoan',
  };
};

export default accountReducer;

export { deposit, withdraw, requestLoan, payLoan };
