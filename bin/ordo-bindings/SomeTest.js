export const increment = (payload) => {
   return {
      type: 'INCREMENT',
      ident: 'SomeTest',
      payload: payload
   };
};

export const decrement = (payload) => {
   return {
      type: 'DECREMENT',
      ident: 'SomeTest',
      payload: payload
   };
};

