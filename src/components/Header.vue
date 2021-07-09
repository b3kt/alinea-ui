<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

      <q-toolbar-title> Quasar App </q-toolbar-title>

      <div>Quasar v{{ $q.version }}</div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: "Header",
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
});
</script>
