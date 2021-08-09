export const constructorReducer = (state, action) => {
    switch (action.type) {
        case "add":
            if (action.payload.type === 'bun' && state.items.find(({type}) => type === 'bun')) {
                return state;
            } else {
                return {
                    items: [
                        ...state.items,
                        action.payload
                    ]
                };
            }
        case "remove":
            return {items: state.items.filter((element, index) => index !== action.payload.index && element._id !== action.payload.index)};
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }
}