<script>
import store from '@/store'
export default {
  functional: true,
  props: {
    authority: {
      type: Array,
      required: true
    }
  },
  render(h, context) {
    const { props, scopedSlots } = context
    const authorities = store.state.user.authorities
    const hasRole = authorities.some(item => props.authority.includes(item))
    return hasRole ? scopedSlots.default() : null
  }
}
</script>
