import Vue from 'vue'

// Only import and use toast on client side
if (process.client) {
  // Define self for SSR compatibility
  if (typeof self === 'undefined') {
    global.self = global
  }
  
  const Toast = require('vue-toast-notification')
  require('vue-toast-notification/dist/theme-default.css')
  
  // Use the plugin
  const ToastPlugin = Toast.default || Toast
  Vue.use(ToastPlugin)

  // Enhance instances after creation to use the plugin's $toast
  Vue.mixin({
    created() {
      // The plugin should have added $toast with an open() method
      // We'll enhance it with convenience methods
      if (this.$toast && typeof this.$toast.open === 'function') {
        const originalOpen = this.$toast.open.bind(this.$toast)
        
        // Add convenience methods
        this.$toast.success = (message) => {
          try {
            return originalOpen({
              message,
              type: 'success',
              position: 'top-right',
              duration: 3000
            })
          } catch (err) {
            console.error('Toast success error:', err)
          }
        }
        
        this.$toast.error = (message) => {
          try {
            return originalOpen({
              message,
              type: 'error',
              position: 'top-right',
              duration: 4000
            })
          } catch (err) {
            console.error('Toast error:', err)
          }
        }
        
        this.$toast.info = (message) => {
          try {
            return originalOpen({
              message,
              type: 'info',
              position: 'top-right',
              duration: 3000
            })
          } catch (err) {
            console.error('Toast info error:', err)
          }
        }
        
        this.$toast.warning = (message) => {
          try {
            return originalOpen({
              message,
              type: 'warning',
              position: 'top-right',
              duration: 3000
            })
          } catch (err) {
            console.error('Toast warning error:', err)
          }
        }
      } else {
        // Fallback: create a basic $toast if plugin didn't provide it
        this.$toast = {
          success: () => console.warn('Toast not initialized'),
          error: () => console.warn('Toast not initialized'),
          info: () => console.warn('Toast not initialized'),
          warning: () => console.warn('Toast not initialized'),
          open: () => console.warn('Toast not initialized')
        }
      }
    }
  })
} else {
  // Server-side: provide no-op methods
  Vue.prototype.$toast = {
    success: () => {},
    error: () => {},
    info: () => {},
    warning: () => {}
  }
}

