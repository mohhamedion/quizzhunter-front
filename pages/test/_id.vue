<template>

</template>
<script>
export default {
  middleware({$auth, redirect,params}) {
    // If the user is not authenticated
      return redirect('/tests/'+params.id)
  }
}
</script>
