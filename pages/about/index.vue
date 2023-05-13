<template>
    <div class="about-page">
        <h1 class="about-title">This is about page title</h1>
        <div class="about-content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, molestias.</div>
        <div class="about-content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, molestias.</div>
        <div class="about-content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, molestias.</div>
        <div class="about-content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, molestias.</div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.about-title {
    margin-top: 32px;
    margin-bottom: 64px;
    text-align: center;
}

.about-content {
    max-width: 600px;
    margin-inline: auto;
    text-align: center;
}

.about-content + .about-content {
    margin-top: 16px;
}
</style>
