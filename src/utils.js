const appendSpaces = sentence => {
    this.sentence = sentence.replace(
        new RegExp('([.|!|?])'),
        new RegExp(' $&')
    );
    return this.sentence;
};

const insertToArray = (arr, index, newItem) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index)
];

export { appendSpaces, insertToArray };
