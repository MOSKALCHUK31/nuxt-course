<template>
    <NuxtLink :to="postLink" class="post-preview">
        <article>
            <div class="post-thumbnail" :style="{backgroundImage: 'url(' + thumbnail + ')'}"></div>
            <div class="post-content">
                <div>{{ title }}</div>
                <div>{{ previewText }} </div>
            </div>
        </article>
    </NuxtLink>
</template>

<script>
export default {
    props: {
        id: {
            type: [String, Number],
            required: true
        },
        isAdmin: {
            type: Boolean,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        previewText: {
            type: String,
            required: true
        }
    },

    computed: {
        postLink() {
            return this.isAdmin ? `/admin/${ this.id }` : `/posts/${ this.id }`
        }
    }
}
</script>

<style scoped>
.post-preview {
    border: 1px solid #ccc;
    box-shadow: 0 2px 2px #ccc;
    background-color: white;
    width: 90%;
}

a {
    text-decoration: none;
    color: black;
}

@media (min-width: 850px) {
    .post-preview {
        width: 400px;
        margin: 10px;
    }
}

.post-thumbnail {
    width: 100%;
    height: 200px;
    background-position: center;
    background-size: cover;
}

.post-content {
    padding: 10px;
    text-align: center;
}

a:hover .post-content,
a:active .post-content {
    background-color: #ccc;
}
</style>
