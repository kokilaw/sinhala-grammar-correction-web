export const getUniqueFromArray = array => {
    const arr = [];
    for (let i = 0; i < array.length; i++) {
        if (!arr.includes(array[i])) {
            arr.push(array[i]);
        }
    }
    return arr;
};

export const arrayContains = (array, value) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) return true;
    }
    return false;
};
