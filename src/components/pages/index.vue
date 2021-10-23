<template>
    <h1 v-resize="'<500'">Index</h1>
</template>

<style lang="sass" scoped>
    h1
        transition: opacity 1s linear

    h1[resize-query*="<500"] 
        opacity: 0.2
</style>