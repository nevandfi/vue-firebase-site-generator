<template>
    <div class="form-spinner-wrapper" :disabled="readOnly" ref="wrapper">

        <!-- LABEL -->
        <label :for="uuid" v-html="labelHtml"></label>
        <!-- LABEL END -->

        <!-- SPINNER FIELD -->
        <div class="spinner-form-field">
            <div class="spinner-sub spinner-buttons" @click="subtractSpinner">-</div>
            <input 
                class="spinner-value"
                type="number" 
                :value="spinnerModelValue"
                :required="required"
                :id="uuid"
                :min="config.min"
                :max="config.max"
                :step="config.step"
                :disabled="readOnly"
                @input="inputSpinnerValue"
            >
            <div class="spinner-add spinner-buttons" @click="addSpinner">+</div>
        </div>
        <!-- SPINNER FIELD END -->
        
    </div>
    <p v-show="validation.errorMessage" v-text="validation.errorMessage"></p>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

// DEFAULT PROPS AND EMITS

const props = defineProps({
    modelValue: { 
        required: true,
        default: 0,
    },
    required: {
        type: Boolean,
        default: false,
    },
    label: {
        type: String,
        required: true,
    },
    config: {
        type: Object,
        default: ({
            min: 0,
            max: 1000,
            step: 10
        }),
    },
    readOnly: {
        type: Boolean,
        default: false,
    },
    uuid: {
        type: Number,
        default: 0,
    },
    validation: {
        type: Object,
        default: () => ({}),
    },
    validations: {
        type: Object,
        default: () => ({}),
    },
})

const emits = defineEmits(['update:modelValue']);

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

// COMPUTED LABEL

const labelHtml = computed(() => {
    const requireValidations = Boolean(props.validations._exclusive && props.validations._exclusive.required);
    const requiredHtml = requireValidations ? '<span class="label--required">*</span>' : '';
    return props.label + requiredHtml;
})

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

// SPINNER FUNCTIONALITY

const spinnerModelValue = ref(props.modelValue);
const { max, min, step } = props.config;

const inputSpinnerValue = (e) => {
    const targetValue = parseInt(e.target.value);
    spinnerModelValue.value = isNaN(targetValue) ? min : targetValue > max ? max : targetValue < min ? min : targetValue;
};

const addSpinner = () => {
    if (spinnerModelValue.value >= max || props.readOnly) return;
    const addedVal = spinnerModelValue.value + step;
    spinnerModelValue.value = addedVal > max ? max : addedVal;
}

const subtractSpinner = () => {
    if (spinnerModelValue.value <= min || props.readOnly) return;
    const subtractedVal = spinnerModelValue.value - step;
    spinnerModelValue.value = subtractedVal < min ? min : subtractedVal;
}

const updateModel = (value) => emits('update:modelValue', value);

watch(spinnerModelValue, (newVal) => updateModel(newVal))

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

</script>

<style lang="sass" scoped>

.spinner-form-field
    --spinner-width: 20rem
    --spinner-height: 2rem
    --spinner-button-width: 3rem
    --spinner-value-width: calc(var(--spinner-width) - 2 * var(--spinner-button-width) - 1rem)

    width: var(--spinner-width)
    height: var(--spinner-height)
    display: flex
    justify-content: space-between
    align-items: center

    & > *
        border-radius: 0.2rem

    .spinner-value
        width: var(--spinner-value-width)
        height: var(--spinner-height)
        text-align: center
        background: #FFF

    .spinner-buttons
        width: var(--spinner-button-width)
        height: var(--spinner-height)
        display: flex
        justify-content: center
        align-items: center
        background: #F00
        cursor: pointer
        user-select: none


</style>