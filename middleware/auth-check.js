export default function (context) {
    console.log('auth-check')
    context.store.dispatch('HANDLE_INIT_AUTH_ACTION', context.req)
}
