export function getInsertionSortAnimations(array) {
    const animations = [];
    const auxiliaryArray = array.slice();
    
    for (let i = 1; i < auxiliaryArray.length; i++) {
      let j = i;
      while (j > 0 && auxiliaryArray[j] < auxiliaryArray[j - 1]) {
        
        // Highlight the bars being compared
        animations.push({ type: 'color', values: [j, j - 1, 'red'] });
        
        // Revert color back to original
        animations.push({ type: 'color', values: [j, j - 1, 'turquoise'] });
        
        // Swap heights
        animations.push({ type: 'height', values: [j, auxiliaryArray[j - 1]] });
        animations.push({ type: 'height', values: [j - 1, auxiliaryArray[j]] });
        
        // Perform the swap in the auxiliary array
        const temp = auxiliaryArray[j];
        auxiliaryArray[j] = auxiliaryArray[j - 1];
        auxiliaryArray[j - 1] = temp;
        
        j--;
      }
    }
    
    return animations;
  }