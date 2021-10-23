<template>
    <transition mode="out-in" @enter="routeEnterAnimation" @leave="routeLeaveAnimation" appear>
        <slot />
    </transition>
</template>

<script setup>
import { getOutAnimation, getInAnimation } from './../index';

const computedInAnimation = getInAnimation();
const computedOutAnimation = getOutAnimation();

const routeEnterAnimation = async (_, done) => {
    await Promise.all(computedInAnimation.value);
    computedInAnimation.value = [];
    done();
}

const routeLeaveAnimation = async (_, done) => {
    await Promise.all(computedOutAnimation.value);
    computedOutAnimation.value = [];
    done();
}

</script>