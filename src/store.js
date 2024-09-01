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
        loan: action.payLoad,
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
