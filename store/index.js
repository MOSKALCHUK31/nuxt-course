import axios from 'axios'

export const state = () => ({
    posts: [],
    test: null
})

export const mutations = {
    HANDLE_SET_POSTS(state, payload) {
        state.posts = payload
    },

    HANDLE_ADD_POST(state, post) {
        state.posts.push(post)
    },

    HANDLE_EDIT_POST(state, editedPost) {
        const postIndex = state.posts.findIndex(post => post.id === editedPost.id)

        state.posts[postIndex] = editedPost
    }
}

export const actions = {
    nuxtServerInit(vuexContext, context) {
        const url = 'https://nuxt-blog-26a45-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
        return axios.get(url)
            .then(response => {
                const postsArray = []

                for (const key in response.data) {
                    postsArray.push({ ...response.data[key], id: key})
                }

                vuexContext.commit('HANDLE_SET_POSTS', postsArray)
            })
            .catch(error => context.error(error))
    },

    async HANDLE_ADD_POST_ACTION(context, post) {
        const url = 'https://nuxt-blog-26a45-default-rtdb.europe-west1.firebasedatabase.app/posts.json'

        try {
            const response = await axios.post(url, { ...post, date: new Date() })
            context.commit('HANDLE_ADD_POST', { ...post, id: response.data.name })
        } catch(error) {
            throw new Error(error)
        }
    },

    HANDLE_EDIT_POST_ACTION(context, editedPost) {
        const url = `https://nuxt-blog-26a45-default-rtdb.europe-west1.firebasedatabase.app/posts/${ editedPost.id }.json`

        return axios.put(url, { ...editedPost, date: new Date() })
            .then(() => context.commit('HANDLE_EDIT_POST', editedPost))
            .catch(error => {
                throw new Error(error)
            })
    }
}

export const getters = {
    getPosts(state) {
        return state.posts
    }
}
