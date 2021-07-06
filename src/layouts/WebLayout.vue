<template>
  <q-layout view="lHr LpR lFr">
    <Header channel="web" />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Header from "components/Header";

export default {
  // name: 'LayoutName',
  components: { Header },
  data() {
    return {
      leftDrawer: true
    };
  }
};
</script>
