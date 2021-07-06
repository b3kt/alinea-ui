<template>
  <q-layout view="lHr LpR lFr">
    <Header channel="app">
      <q-resize-observer @resize="onResize" />
    </Header>
    <!-- <DialogDashboard :saveListener="() => {}" :bar="isAuthenticated && !isActivationDialog">
      <AuthorActivationForm v-if="isAuthenticated && isActivationDialog" />
      <FormRenderer :model="getModel" v-if="isAuthenticated && !isActivationDialog" />
    </DialogDashboard> -->

    <q-header class="bg-white text-grey" :style="'margin-top:' + header.height + 'px'">
      <q-resize-observer @resize="onResizeToolbar" />
      <q-toolbar>
        <q-btn flat round dense @click="leftDrawer = !leftDrawer">
          <q-avatar>
            <q-img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
        </q-btn>
        <q-toolbar-title class="title">{{ getUserInfo().name }}</q-toolbar-title>
        <q-space />
        <q-btn-group flat>
          <!-- <q-btn
            icon="la la-folder"
            class="bg-teal-5 text-white"
            :label="getIsMobile ? null : $t('workspace')"
          />
          <q-btn
            icon="la la-plus"
            class="bbg-white text-primary"
            :label="getIsMobile ? null : $t('create_book')"
          /> -->
          <q-btn-dropdown
            auto-close
            flat
            icon="la la-coins"
            :label="getIsMobile ? null : $t('balance')"
            class="bg-yellow text-primary"
          >
            <q-list>
              <q-item clickable @click="tab = 'movies'">
                <q-item-section>Movies</q-item-section>
              </q-item>

              <q-item clickable>
                <q-item-section>Photos</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn icon="la la-close" @click="rightDrawer = !rightDrawer" />
        </q-btn-group>
      </q-toolbar>
    </q-header>

    <FooterDashboard />
    <q-page-container
      class="bg-grey-2 q-mt-xl"
      :style="'margin-top: ' + getMargin + 'px;'"
    >
      <div class="row">
        <div class="col">
          <router-view />
        </div>
      </div>
    </q-page-container>

    <q-drawer side="right" v-model="rightDrawer" content-class="bg-grey-3">
      <div class="q-pa-md">
        <Widget :title="$t('ewallet')">
          <WalletPanel />
        </Widget>
        <Widget :title="$t('my_cart')" :hasMore="true">
          <div v-for="i in 3" v-bind:key="i">
            <CartItem />
          </div>
        </Widget>
      </div>
    </q-drawer>
  </q-layout>
</template>

<script>
// import { mapGetters } from "vuex";
// import DialogDashboard from "components/DialogDashboard";
// import FormRenderer from "components/FormRenderer.vue";
// import AuthorActivationForm from "components/AuthorActivationForm";
import FooterDashboard from "components/FooterDashboard";
import WalletPanel from "components/WalletPanel";
import Header from "components/Header";
import Widget from "components/Widget";
import CartItem from "components/CartItem";

export default {
  name: "DashboardLayout",
  components: {
    CartItem,
    Widget,
    Header,
    WalletPanel,
    FooterDashboard,
    // AuthorActivationForm,
    // DialogDashboard,
    // FormRenderer
  },
  data() {
    return {
      header: "",
      toolbar: "",
      margin: "",
      rightDrawer: false,
    };
  },
  methods: {
    onResize(size) {
      this.header = size;
    },
    onResizeToolbar(size) {
      this.toolbar = size;
    },
  },
  computed: {
    getIsMobile() {
      return this.$q.screen.lt.sm;
    },
    getMargin() {
      return this.toolbar.height;
    },
    // ...mapGetters({
    //   getModel: "ui/getDialogModel",
    //   getData: "ui/getDialogModelData",
    //   isActivationDialog: "ui/getActivationDialog",
    // }),
    model: {
      set(model) {
        this.$store.commit("ui/setModelData", model);
      },
      get() {
        return this.getModel;
      },
    },
  },
};
</script>
