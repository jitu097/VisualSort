export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    bubbleSortHelper(array, animations);
    return animations;
}

export function bubbleSort(array) {
    if (array.length <= 1) return array;
    return bubbleSortRec(array);
}

function bubbleSortHelper(array, animations) {
    let n = array.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            // Compare elements at indices i and i+1
            animations.push({ type: 'color', values: [i, i + 1, 'red'] });
            animations.push({ type: 'color', values: [i, i + 1, 'turquoise'] });
            if (array[i] > array[i + 1]) {
                // Swap elements if out of order
                animations.push({ type: 'swap', values: [i, array[i + 1]] });
                animations.push({ type: 'swap', values: [i + 1, array[i]] });
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                swapped = true;
            }
        }
        n--; // Reduce the range for the next pass
    } while (swapped);
}

function bubbleSortRec(array) {
    let n = array.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (array[i] > array[i + 1]) {
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                swapped = true;
            }
        }
        n--;
    } while (swapped);
    return array;
}
