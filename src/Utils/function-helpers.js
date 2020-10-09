export const mapArray = (items, itemId, newParameter ) => {
    return items.map(u => {
        if (u.id === itemId) {
            return {...u, ...newParameter}
        }
        return u;
    })
}