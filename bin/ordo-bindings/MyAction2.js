export const increment = () => {
   return {
      type: 'INCREMENT',
      ident: 'MyAction2'
   };
};

export const decrement = (payload) => {
   return {
      type: 'DECREMENT',
      ident: 'MyAction2',
      payload: payload
   };
};

