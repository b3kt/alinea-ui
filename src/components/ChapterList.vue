<template>
  <div>
    <q-list dense bordered padding class="rounded-borders">
      <q-item clickable v-ripple>
        <q-item-section>
          Item
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          Item
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          Item
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: 'ChapterList',
  setup () {
    return {}
  }
}
</script>
