export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

export function mergeSort(array) {
    if (array.length <= 1) return array;
    return mergeSortRec(array);
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations
) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations
) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        // Comparing indices i and j
        animations.push({ type: 'color', values: [i, j, 'red'] });
        animations.push({ type: 'color', values: [i, j, 'turquoise'] });
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // Overwrite value at index k with auxiliaryArray[i]
            animations.push({ type: 'swap', values: [k, auxiliaryArray[i]] });
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            // Overwrite value at index k with auxiliaryArray[j]
            animations.push({ type: 'swap', values: [k, auxiliaryArray[j]] });
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        // Comparing index i with itself
        animations.push({ type: 'color', values: [i, i, 'red'] });
        animations.push({ type: 'color', values: [i, i, 'turquoise'] });
        // Overwrite value at index k with auxiliaryArray[i]
        animations.push({ type: 'swap', values: [k, auxiliaryArray[i]] });
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        // Comparing index j with itself
        animations.push({ type: 'color', values: [j, j, 'red'] });
        animations.push({ type: 'color', values: [j, j, 'turquoise'] });
        // Overwrite value at index k with auxiliaryArray[j]
        animations.push({ type: 'swap', values: [k, auxiliaryArray[j]] });
        mainArray[k++] = auxiliaryArray[j++];
    }
}

function mergeSortRec(array) {
    if (array.length <= 1) return array;
    const middle = Math.floor(array.length / 2);
    const left = mergeSortRec(array.slice(0, middle));
    const right = mergeSortRec(array.slice(middle));
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0;
    let j = 0;
    while(i < left.length && j < right.length) {
        if(left[i] < right[j]) {
            result.push(left[i]);
            i++;
        }
        else {
            result.push(right[j]);
            j++;
        }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}