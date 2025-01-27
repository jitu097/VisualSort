export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}

export function quickSort(array) {
    if (array.length <= 1) return array;
    quickSortRec(array, 0, array.length - 1);
    return array;
}

function quickSortHelper(mainArray, low, high, animations) {
    if (low < high) {
        const pi = partition(mainArray, low, high, animations);

        // Recursively sort the elements before and after partition
        quickSortHelper(mainArray, low, pi - 1, animations);
        quickSortHelper(mainArray, pi + 1, high, animations);
    }
}

function partition(array, low, high, animations) {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        // Comparing index j with the pivot
        animations.push({ type: 'color', values: [j, high, 'red'] });
        animations.push({ type: 'color', values: [j, high, 'turquoise'] });

        if (array[j] < pivot) {
            i++;
            // Swap elements at indices i and j
            animations.push({ type: 'swap', values: [i, array[j]] });
            animations.push({ type: 'swap', values: [j, array[i]] });
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Swap the pivot element with the element at index (i + 1)
    animations.push({ type: 'swap', values: [i + 1, array[high]] });
    animations.push({ type: 'swap', values: [high, array[i + 1]] });
    [array[i + 1], array[high]] = [array[high], array[i + 1]];

    return i + 1;
}

function quickSortRec(array, low, high) {
    if (low < high) {
        const pi = partitionRec(array, low, high);

        // Recursively sort elements before and after partition
        quickSortRec(array, low, pi - 1);
        quickSortRec(array, pi + 1, high);
    }
}

function partitionRec(array, low, high) {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    return i + 1;
}
