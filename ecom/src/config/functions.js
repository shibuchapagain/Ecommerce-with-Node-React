const helpers = {
  ucFirst: (str) => {
    // admin --> Admin
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
};

export default helpers;
