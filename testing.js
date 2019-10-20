let arrayOfObjDidChange = (oldArray, newArray, keyToCheck) => {
    let unchanged = [];
    oldArray.forEach(oldObj => { // generates a list of Types that are shared between the database and the local state
        newArray.forEach(newObj => {
            if (oldObj[keyToCheck] === newObj[keyToCheck]) {
                unchanged.push(newObj);
            }
        });
    });
    // console.log('old array:', oldArray)
    // console.log('newArray:', newArray)
    // console.log('unchanged:', unchanged)

    if (unchanged.length === oldArray.length) {
        return false;
    } else {
        return {
            delete: objectsToDelete(oldArray, unchanged, keyToCheck),
            post: objectsToPost(newArray, unchanged, keyToCheck)
        };
    }
}
let arrayOfStringsDidChange = (oldArray, newArray) => {
    let unchanged = [];
    oldArray.forEach(oldString => { // generates a list of Types that are shared between the database and the local state
        newArray.forEach(newString => {
            if (oldString === newString) {
                unchanged.push(newString);
            }
        });
    });
    if (unchanged.length === oldArray.length) {
        return false;
    } else {
        return {
            delete: stringsToDelete(oldArray, unchanged),
            post: stringsToPost(newArray, unchanged)
        };
    }
}
let objectsToDelete = (oldArray, unchanged, keyToCheck) => {
    let toDelete = [...oldArray];
    oldArray.forEach(oldObj => {
        unchanged.forEach(unchangedObj => {
            if (oldObj[keyToCheck] === unchangedObj[keyToCheck]) {
                // console.log(toDelete.indexOf(oldObj))
                toDelete.splice(toDelete.indexOf(oldObj), 1)
            }
        });
    });
    // console.log('old array:', oldArray)
    // console.log('things to delete:', toDelete)
    // console.log('unchanged:', unchanged)
    return toDelete;
}
let stringsToDelete = (oldArray, unchanged) => {
    let toDelete = [...oldArray];
    oldArray.forEach(oldString => {
        unchanged.forEach(unchangedString => {
            if (oldString === unchangedString) {
                toDelete.splice(toDelete.indexOf(oldString), 1)
            }
        });
    });
    return toDelete;
}
let objectsToPost = (newArray, unchanged, keyToCheck) => {
    let toPost = [...newArray];
    newArray.forEach(newObj => {
        unchanged.forEach(unchangedObj => {
            if (newObj[keyToCheck] === unchangedObj[keyToCheck]) {
                toPost.splice(toPost.indexOf(newObj), 1)
            }
        });
    });
    return toPost;
}
let stringsToPost = (newArray, unchanged) => {
    let toPost = [...newArray];
    newArray.forEach(newString => {
        unchanged.forEach(unchangedString => {
            if (newString === unchangedString) {
                toPost.splice(toPost.indexOf(newString), 1)
            }
        });
    });
    return toPost;
}

// console.log('contact changed?', contactDidChange())//returns true or false
// console.log('types changed?', arrayOfObjDidChange([{ type: 1 }, { type: 2 }, { type: 3 }], [{ type: 1 }, { type: 2 },{ type: 4 }], 'type'))//returns false, or arrays of things to delete/post
// console.log('hours changed?', arrayOfObjDidChange([{ day: 'eggs' }, { type: 'grits' }, { day: 'bacon' }], [{ day: 'eggs' }, { type: 'grits' },{ day: 'potatoes' }], 'day'))//returns false, or arrays of things to delete/post
console.log('tags changed?', arrayOfStringsDidChange(['eggs', 'grits', 'bacon'], ['eggs', 'grits', 'potatoes']))//returns false, or arrays of things to delete/post

// console.log('types changed?', objectsToPost([{ type: 1 }, { type: 2 }, { type: 4 }], [{ type: 1 }, { type: 2 }], 'type'))//returns false, or arrays of things to delete/post
