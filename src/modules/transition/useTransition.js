import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const allActiveInTransitions = ref([]);
const allActiveOutTransitions = ref([]);

export function getInAnimation () {
    return computed({
        get: () => allActiveInTransitions.value,
        set: (value) => allActiveInTransitions.value = value,
    })
}

export function getOutAnimation () {
    return computed({
        get: () => allActiveOutTransitions.value,
        set: (value) => allActiveOutTransitions.value = value,
    })
}

export function getTransitionduration () {
}

/**
 * @typedef {Object} animationOption
 * @property {function} in
 * @property {function} out
 */

/**
 * Function to register animation inside a vue component
 * 
 * @param {animationOption} option 
 */

export function useTransition(option) {

    const computedInAnimation = getInAnimation();
    const computedOutAnimation = getOutAnimation();

    onMounted(() => {
        const currentInAnimationPromise = new Promise((resolve) => option.in(resolve));
        computedInAnimation.value = [...computedInAnimation.value, currentInAnimationPromise];
    })

    onBeforeUnmount(() => {
        const currentOutAnimationPromise = new Promise((resolve) => option.out(resolve));
        computedOutAnimation.value = [...computedOutAnimation.value, currentOutAnimationPromise];
    })

}