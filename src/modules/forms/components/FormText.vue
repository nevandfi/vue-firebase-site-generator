<template>
    <div class="form-text-wrapper">
        <label :for="uuid" v-html="labelHtml"></label>
        <input 
            :type="config.type" 
            :value="modelValue"
            :required="required"
            :id="uuid"
            :disabled="readOnly"
            @input="updateModel($event.target.value)"
        >
    </div>
    <p v-show="validation.errorMessage" v-text="validation.errorMessage"></p>
</template>

<script setup>

import { computed } from 'vue';

const props = defineProps({
    modelValue: { 
        required: true,
        default: ''
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
        default: () => ({ type: "text" }),
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

const labelHtml = computed(() => {
    const requireValidations = Boolean(props.validations._exclusive && props.validations._exclusive.required);
    const requiredHtml = requireValidations ? '<span class="label--required">*</span>' : '';
    return props.label + requiredHtml;
})

const updateModel = (value) => emits('update:modelValue', value);

</script>