<template>
    <div class="posts-page">
        <PostList :posts="getPosts"/>
    </div>
</template>

<script>
import PostList from "@/components/Posts/PostList"

import { mapGetters } from "vuex"

export default {
    components: {
        PostList
    },

    computed: {
        ...mapGetters({
            getPosts: 'getPosts'
        })
    }
}
</script>

<style scoped lang="scss">

</style>
