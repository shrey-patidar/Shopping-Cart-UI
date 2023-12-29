const initialState = JSON.parse(localStorage.getItem("userId"));
const updateUser = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE":
      return (state = action.payload);

    default:
      return state;
  }
};

export default updateUser;
