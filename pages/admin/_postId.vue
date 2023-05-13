<template>
    <div class="admin-post-page">
        <section class="update-form">
            <AdminPostForm :post="post" @handleSubmit="handleSubmitted"/>
        </section>
    </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm"

import axios from 'axios'

export default {
    layout: 'admin',

    components: {
        AdminPostForm
    },

    asyncData(context) {
        const url = `https://nuxt-blog-26a45-default-rtdb.europe-west1.firebasedatabase.app/posts/${ context.route.params.postId }.json`

        return axios.get(url)
            .then(response => {
                return {
                    post: response.data
                }
            })
            .catch(error => context.error(error))
    },

    methods: {
        handleSubmitted(postData) {
            this.$store.dispatch('HANDLE_EDIT_POST_ACTION', { ...postData, id: this.$route.params.postId })
                .then(() => {
                    this.$router.push('/admin')
                })
        }
    }
}
</script>

<style scoped>
.update-form {
    max-width: 90%;
    margin: 20px auto;
}

@media (min-width: 768px) {
    .update-form {
        width: 500px;
    }
}
</style>
