import React from 'react';
import './ExplanationTree.css';

/**
 * ExplanationTree Component
 * Displays a hierarchical tree explaining the steps of the selected sorting algorithm.
 *
 * Props:
 * - algorithm (string): The name of the sorting algorithm to explain.
 */
const ExplanationTree = ({ algorithm }) => {
    // Define explanations for each sorting algorithm
    const explanations = {
        'Merge Sort': {
            title: 'Merge Sort Explanation',
            steps: [
                {
                    step: 'Divide',
                    description: 'Split the array into two halves.'
                },
                {
                    step: 'Conquer',
                    description: 'Recursively sort each half.'
                },
                {
                    step: 'Combine',
                    description: 'Merge the sorted halves to create a sorted array.'
                }
            ]
        },
        'Quick Sort': {
            title: 'Quick Sort Explanation',
            steps: [
                {
                    step: 'Choose Pivot',
                    description: 'Select a pivot element from the array.'
                },
                {
                    step: 'Partition',
                    description: 'Rearrange the array so that elements less than the pivot are on the left, and those greater are on the right.'
                },
                {
                    step: 'Recursively Apply',
                    description: 'Apply the above steps to the sub-arrays.'
                }
            ]
        },
        'Bubble Sort': {
            title: 'Bubble Sort Explanation',
            steps: [
                {
                    step: 'Compare Adjacent',
                    description: 'Compare each pair of adjacent elements.'
                },
                {
                    step: 'Swap if Necessary',
                    description: 'Swap them if they are in the wrong order.'
                },
                {
                    step: 'Repeat',
                    description: 'Repeat the process until the array is sorted.'
                }
            ]
        },
        'Insertion Sort': {
            title: 'Insertion Sort Explanation',
            steps: [
                {
                    step: 'Start from Second Element',
                    description: 'Begin with the second element in the array.'
                },
                {
                    step: 'Compare and Shift',
                    description: 'Compare it with elements before it and shift them one position to the right if they are greater.'
                },
                {
                    step: 'Insert Element',
                    description: 'Insert the element at the correct position.'
                },
                {
                    step: 'Repeat',
                    description: 'Move to the next element and repeat the process.'
                }
            ]
        }
    };

    // Retrieve the explanation based on the selected algorithm
    const explanation = explanations[algorithm] || {
        title: 'No Explanation Available',
        steps: []
    };

    return (
        <div className="explanation-tree">
            <h2>{explanation.title}</h2>
            <ul>
                {explanation.steps.map((item, index) => (
                    <li key={index}>
                        <span className="step-number">{index + 1}.</span> <strong>{item.step}:</strong> {item.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExplanationTree;