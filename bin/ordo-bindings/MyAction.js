export const increment = () => {
   return {
      type: 'INCREMENT',
      ident: 'MyAction'
   };
};

export const decrement = (payload) => {
   return {
      type: 'DECREMENT',
      ident: 'MyAction',
      payload: payload
   };
};

