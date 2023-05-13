<template>
    <div class="admin-new-post-page">
        <section class="new-post-form">
            <AdminPostForm @handleSubmit="handleSubmitted"/>
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

    methods: {
        handleSubmitted(postData) {
            this.$store.dispatch('HANDLE_ADD_POST_ACTION', postData)
                .then(() => {
                    this.$router.push('/admin')
                })
        }
    }
}
</script>

<style scoped>
.new-post-form {
    max-width: 90%;
    margin: 20px auto;
}

@media (min-width: 768px) {
    .new-post-form {
        width: 500px;
    }
}
</style>
