<template>
  <div>
    <q-toolbar flat class="bg-grey-3" >
      <q-breadcrumbs separator="|" separator-color="blue-grey-4" class="text-grey">
        <q-breadcrumbs-el icon="la la-arrow-left" :label="$t('back')" @click="$router.go(-1)"/>
        <q-breadcrumbs-el icon="la la-home" @click="$router.push('/')"/>
        <q-breadcrumbs-el label="Components" />
        <q-breadcrumbs-el label="Breadcrumbs" />
      </q-breadcrumbs>
      <q-space/>
      <q-btn flat round dense>
        <q-icon name="las la-ellipsis-v" class="text-primary" />
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
