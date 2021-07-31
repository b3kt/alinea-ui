<template>
  <div>
    <q-toolbar class="bg-grey-3 shadow-1">
      <!-- <q-btn flat round dense>
        <q-icon name="menu" />
      </q-btn> -->
      <!-- <q-toolbar-title> Toolbar </q-toolbar-title> -->
      <q-breadcrumbs separator="|">
        <q-breadcrumbs-el icon="la la-home" />
        <q-breadcrumbs-el label="Components" />
        <q-breadcrumbs-el label="Breadcrumbs" />
      </q-breadcrumbs>
      <q-space/>
      <q-btn flat round dense>
        <q-icon name="more_vert" />
      </q-btn>
    </q-toolbar>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  setup() {
    return {};
  },
};
</script>
