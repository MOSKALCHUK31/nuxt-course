<template>
    <div class="single-post-page">
        <section class="post">
            <div class="post-title">{{ loadedPost.title }}</div>
            <div class="post-details">
                <div>Last updated on: {{ loadedPost.date | date }}</div>
                <div>Written by {{ loadedPost.author }}</div>
            </div>
            <div class="post-content">{{ loadedPost.text }}</div>
        </section>
        <section>
            <div class="post-feedback">Let me know what you think about the post, send a mail to <a href="mailto: test@test.com">test@test.com</a></div>
        </section>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    asyncData(context) {
        const url = `${ process.env.firebaseUrl }/posts/${ context.route.params.id }.json`
        return axios.get(url)
            .then(response => {
                return {
                    loadedPost: response.data
                }
            })
            .catch(error => context.error(error))
    }
}
</script>

<style scoped >
.single-post-page {
    padding: 30px;
    text-align: center;
    box-sizing: border-box;
}

.post {
    width: 100%;
}

@media (min-width: 768px) {
    .post {
        width: 600px;
        margin: auto;
    }
}

.post-title {
    margin: 0;
}

.post-details {
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 3px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
}

@media (min-width: 768px) {
    .post-details {
        flex-direction: row;
    }
}

.post-detail {
    color: rgb(88, 88, 88);
    margin: 0 10px;
}

.post-feedback a {
    color: red;
    text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
    color: salmon;
}
</style>
