<template>
    <div class="admin-page">
        <section class="new-post">
            <AppButton @click="$router.push('admin/new-post')">Create post</AppButton>
            <AppButton @click="handleLogout">Logout</AppButton>
        </section>
        <section class="existing-posts">
            <h1>Existing posts</h1>
            <PostList :posts="getPosts" isAdmin/>
        </section>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    layout: 'admin',

    middleware: ['auth-check', 'auth'],

    computed: {
        ...mapGetters({
            getPosts: 'getPosts'
        })
    },

    methods: {
        handleLogout() {
            this.$store.dispatch('HANDLE_LOGOUT_ACTION')
            this.$router.push('/admin/auth')
        }
    }
}
</script>

<style scoped>
.admin-page {
    padding: 20px;
}

.new-post {
    text-align: center;
    border-bottom: 2px solid #ccc;
    padding-bottom: 10px;
    display: flex;
    justify-content: center;
    gap: 20px
}

.existing-posts h1 {
    text-align: center;
}
</style>
