<template>
    <div class="layout">
        <TheHeader @sidenavToggle="displaySideNav = !displaySideNav"/>
        <TheSidenav :show="displaySideNav" @close="displaySideNav = false"/>
        <Nuxt/>
    </div>
</template>

<script>
import TheHeader from "@/components/Navigation/TheHeader";
import TheSidenav from "@/components/Navigation/TheSidenav";

export default {
    components: {
        TheHeader,
        TheSidenav
    },

    data() {
        return {
            displaySideNav: false
        }
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body {
    font-family: 'Open Sans', sans-serif;
}
</style>
