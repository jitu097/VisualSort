import React from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms/mergesorting.js';
import { getQuickSortAnimations } from '../sortingAlgorithms/quicksorting.js';
import { getBubbleSortAnimations } from '../sortingAlgorithms/bubblesorting.js';
import { getInsertionSortAnimations } from '../sortingAlgorithms/insertionsort.js';
import ExplanationTree from './ExplanationTree'; // Import the ExplanationTree component
import './Sortingvisualizer.css';

// Function to generate random integers
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function to map array value to a color
function getBarColor(value, maxValue) {
    const ratio = value / maxValue;
    const hue = (120 - ratio * 120).toString(10); // Green to Red
    return `hsl(${hue}, 100%, 50%)`;
}

const ANIMATION_SPEED_MS = 5;
const NUMBER_OF_ARRAY_BARS = 50;

export default class Sortingvisualizer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            array: [],
            maxValue: 0,
            selectedAlgorithm: '', // Tracks which algorithm was selected
            showExplanation: false, // Controls visibility of ExplanationTree
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    /**
     * Generates a new array of random integers and resets state.
     */
    resetArray(){
        const array = [];
        let currentMax = 0;
        for(let i = 0; i < NUMBER_OF_ARRAY_BARS; i++){
            const randomNumber = randomIntFromInterval(5, 730);
            array.push(randomNumber);
            if(randomNumber > currentMax) currentMax = randomNumber;
        }
        this.setState({ array, maxValue: currentMax, showExplanation: false, selectedAlgorithm: '' });
    }

    /**
     * Initiates Merge Sort and sets the selected algorithm.
     */
    mergeSort(){
        const animations = getMergeSortAnimations(this.state.array);
        this.animateSort(animations);
        this.setState({ selectedAlgorithm: 'Merge Sort' }, () => {
            // Show explanation after sorting animation completes
            setTimeout(() => {
                this.setState({ showExplanation: true });
            }, animations.length * ANIMATION_SPEED_MS);
        });
    }

    /**
     * Initiates Quick Sort and sets the selected algorithm.
     */
    quickSort(){
        const animations = getQuickSortAnimations(this.state.array);
        this.animateSort(animations);
        this.setState({ selectedAlgorithm: 'Quick Sort' }, () => {
            setTimeout(() => {
                this.setState({ showExplanation: true });
            }, animations.length * ANIMATION_SPEED_MS);
        });
    }

    /**
     * Initiates Bubble Sort and sets the selected algorithm.
     */
    bubbleSort(){
        const animations = getBubbleSortAnimations(this.state.array);
        this.animateSort(animations);
        this.setState({ selectedAlgorithm: 'Bubble Sort' }, () => {
            setTimeout(() => {
                this.setState({ showExplanation: true });
            }, animations.length * ANIMATION_SPEED_MS);
        });
    }

    /**
     * Initiates Insertion Sort and sets the selected algorithm.
     */
    insertionSort(){
        const animations = getInsertionSortAnimations(this.state.array);
        this.animateSort(animations);
        this.setState({ selectedAlgorithm: 'Insertion Sort' }, () => {
            setTimeout(() => {
                this.setState({ showExplanation: true });
            }, animations.length * ANIMATION_SPEED_MS);
        });
    }

    /**
     * Animates the sorting process based on the provided animations.
     * @param {Array} animations - The sequence of animations for the sorting process.
     */
    animateSort(animations){
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i = 0; i < animations.length; i++){
            const isColorChange = animations[i].type === 'color';
            if(isColorChange){
                const [barOneIdx, barTwoIdx, color] = animations[i].values;
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else{
                const [barIdx, newHeight] = animations[i].values;
                const barStyle = arrayBars[barIdx].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    render(){
        const { array, maxValue, showExplanation, selectedAlgorithm } = this.state;

        return (
            <div className="container">
                <h1 className="text-center mt-4">Sorting Visualizer By Jitenra kumar</h1>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div 
                            className="array-bar" 
                            key={idx} 
                            style={{ 
                                height: `${value}px`,
                                backgroundColor: getBarColor(value, maxValue),
                            }}>
                        </div>
                    ))}
                </div>
                <div className="button-group">
                    <button className="btn-merge" onClick={() => this.mergeSort()} aria-label="Merge Sort">Merge Sort</button>
                    <button className="btn-quick" onClick={() => this.quickSort()} aria-label="Quick Sort">Quick Sort</button>
                    <button className="btn-insertion" onClick={() => this.insertionSort()} aria-label="Insertion Sort">Insertion Sort</button>
                    <button className="btn-bubble" onClick={() => this.bubbleSort()} aria-label="Bubble Sort">Bubble Sort</button>
                    <button className="btn-reset" onClick={() => this.resetArray()} aria-label="Generate New Array">Generate Array</button>
                </div>
                {/* Render the ExplanationTree component conditionally */}
                {showExplanation && (
                    <ExplanationTree algorithm={selectedAlgorithm} />
                )}
            </div>
        );
    }
}