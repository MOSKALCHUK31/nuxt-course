import axios from 'axios'
import Cookies from 'js-cookie'

export const state = () => ({
    posts: [],
    token: null
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
    },

    HANDLE_SET_TOKEN(state, token) {
        state.token = token
    },

    HANDLE_REMOVE_TOKEN(state) {
        state.token = null
    }
}

export const actions = {
    nuxtServerInit(vuexContext, context) {
        const url = process.env.firebaseUrl + '/posts.json'
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
        const url = `https://nuxt-blog-26a45-default-rtdb.europe-west1.firebasedatabase.app/posts.json?auth=${ context.state.token }`

        try {
            const response = await axios.post(url, { ...post, date: new Date() })
            context.commit('HANDLE_ADD_POST', { ...post, id: response.data.name })
        } catch(error) {
            throw new Error(error)
        }
    },

    async HANDLE_EDIT_POST_ACTION(context, editedPost) {
        const url = `https://nuxt-blog-26a45-default-rtdb.europe-west1.firebasedatabase.app/posts/${ editedPost.id }.json?auth=${ context.state.token }`

        try {
            await axios.put(url, { ...editedPost, date: new Date() })

            context.commit('HANDLE_EDIT_POST', editedPost)
        } catch(error) {
            throw new Error(error)
        }
    },

    async HANDLE_AUTH_ACTION(context, payload) {
        const url = payload.url
        const data = {
            email: payload.email,
            password: payload.password,
            returnSecureToken: payload.returnSecureToken
        }

        try {
            const response = await axios.post(url, data)

            context.commit('HANDLE_SET_TOKEN', response.data.idToken)

            localStorage.setItem('token', response.data.idToken)
            localStorage.setItem('tokenExpiration', new Date().getTime() + +response.data.expiresIn * 1000)
            Cookies.set('jwt', response.data.idToken)
            Cookies.set('tokenExpiration', new Date().getTime() + +response.data.expiresIn * 100)

        } catch(error) {
            throw new Error(error)
        }
    },

    HANDLE_INIT_AUTH_ACTION(context, request) {
        let token
        let expirationDate

        if (request) {
            if (!request.headers.cookie) return

            const jwtCookie = request.headers.cookie
                .split(';')
                .find(c => c.trim().startsWith('jwt='))

            if (!jwtCookie) return

            token = jwtCookie.split('=')[1]

            expirationDate = request.headers.cookie
                .split(';')
                .find(c => c.trim().startsWith('tokenExpiration='))
                .split('=')[1]
        } else {
            token = localStorage.getItem('token')
            expirationDate = localStorage.getItem('tokenExpiration')
        }

        if (new Date().getTime() > +expirationDate || !token) {
            console.log('no token or invalid token')
            context.commit('HANDLE_REMOVE_TOKEN')
            return
        }

        context.commit('HANDLE_SET_TOKEN', token)
    },

    HANDLE_LOGOUT_ACTION(context) {
        if (process.client) {
            localStorage.removeItem('token')
            localStorage.removeItem('tokenExpiration')
        }
        
        Cookies.remove('jwt')
        Cookies.remove('tokenExpiration')

        context.commit('HANDLE_REMOVE_TOKEN')
    }
}

export const getters = {
    getPosts(state) {
        return state.posts
    },

    isAuthenticated(state) {
        return !!state.token
    }
}
