<template>
  <div>
    <q-toolbar flat class="bg-grey-3" >
      <q-breadcrumbs separator="|" separator-color="blue-grey-4" class="text-grey">
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
