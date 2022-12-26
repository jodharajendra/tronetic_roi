const notEqualsZero = value => {
  if (value) {
    if (value.length !== 0) return true;
    else return false;
  } else return false;
};

const validateEmail = text => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(text) === false
    ? 'Please enter a valid email address'
    : undefined;
};

export {
  notEqualsZero,
  validateEmail
};