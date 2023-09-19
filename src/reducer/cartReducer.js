const cartReducer = (state, action) => {
    switch(action.type){
        case 'ADD-TO-CART':
            let {id, color, amount, product} = action.payload;

            //if existing product
            let existingProduct = state.cart.find(
                (curItem) => curItem.id === id + color
              );

            if (existingProduct) {
            let updatedProduct = state.cart.map((curElem) => {
                if (curElem.id === id + color) {
                    let newAmount = curElem.amount + amount;
            
                    if (newAmount >= curElem.max) {
                        newAmount = curElem.max;
                    }
                    return {
                        ...curElem,
                        amount: newAmount,
                    };
                } else {
                    return curElem;
                }
            });

            return {
                ...state,
                cart: updatedProduct,
                };
            } else {
                let cartProduct;

                cartProduct = {
                    id: id + color,
                    name: product.name,
                    color,
                    amount,
                    image: product.image[0].url,
                    price: product.price,
                    max: product.stock,
                    }

                return {
                    ...state, 
                    cart: [...state.cart, cartProduct],
                }
            }

        case 'REMOVE_ITEM':
            let updatedCart = state.cart.filter(
                (curItem) => curItem.id !== action.payload
              );

              return {
                ...state,
                cart: updatedCart,
              };

        case "CLEAR_CART":
            return {
                ...state,
                cart: [],
            };

        case 'SET_INCREMENT':
            let updateProduct = state.cart.map((curElem) => {
                if (curElem.id === action.payload) {
                  let incAmount = curElem.amount + 1;
          
                  if (incAmount >= curElem.max) {
                    incAmount = curElem.max;
                  }
          
                  return {
                    ...curElem,
                    amount: incAmount,
                  };
                } else {
                  return curElem;
                }
              });
              return { ...state, cart: updateProduct };

        case 'CART_ITEM_PRICE_TOTAL':
            let { total_item, total_price } = state.cart.reduce(
              (accum, curElem) => {
                let { price, amount } = curElem;
        
                accum.total_item += amount;
                accum.total_price += price * amount;
        
                return accum;
              },
              {
                total_item: 0,
                total_price: 0,
              }
            );
            
            return {
              ...state,
              total_item,
              total_price,
            };
          

        case 'SET_DECREMENT':
            let updatedProduct = state.cart.map((curElem) => {
                if (curElem.id === action.payload) {
                  let decAmount = curElem.amount - 1;
          
                  if (decAmount <= 1) {
                    decAmount = curElem.max;
                  }
          
                  return {
                    ...curElem,
                    amount: decAmount,
                  };
                } else {
                  return curElem;
                }
              });
              return { ...state, cart: updatedProduct };
        default:
            return state;
    }
}

export default cartReducer;