export default function Reducer(state, action) {
  switch (action.type) {
    case "INCREASE_FONT":
      const incFontSize = state.fontSize < 24 ? state.fontSize + 1 : state.fontSize;
      return {
        ...state,
        fontSize: incFontSize
      };

    case "DECREASE_FONT":
      const decFontSize = state.fontSize > 8 ? state.fontSize - 1 : state.fontSize;
      return {
        ...state,
        fontSize: decFontSize
      };

    default:
      return state;
  }
};
