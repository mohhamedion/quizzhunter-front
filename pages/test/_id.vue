<template>

</template>
<script>
export default {
  middleware({$auth, redirect,params}) {
    // If the user is not authenticated
      return redirect(this.localePath('/tests/'+params.id))
  }
}
</script>
