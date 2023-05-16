<template>
    <div class="posts-page">
        <PostList :posts="getPosts"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
    computed: {
        ...mapGetters({
            getPosts: 'getPosts'
        })
    }
}
</script>

<style scoped lang="scss">

</style>
