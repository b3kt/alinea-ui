<template>
  <div v-if="isAuthenticated">
    <q-list class="rounded-borders">
      <div>
        <ViewSwitcher />
      </div>

      <div v-for="(item, index) in menus" v-bind:key="index">
        <q-item v-if="item.menu.children.length === 0" :to="item.menu.target_url">
          <q-item-section
            v-if="item.menu.icon !== undefined && item.menu.icon !== null"
            avatar
          >
            <q-icon :name="item.menu.icon" />
          </q-item-section>
          <q-item-section>{{ item.menu.label }}</q-item-section>
        </q-item>

        <q-expansion-item
          group="menu"
          v-else
          expand-separator
          :icon="item.menu.icon"
          :label="item.menu.label"
        >
          <q-item
            class="bg-blue-grey-1 q-pl-lg"
            clickable
            :inset-level="0"
            v-for="(item1, index1) in item.menu.children"
            v-bind:key="index1"
            :to="item1.target_url"
          >
            <q-item-section avatar v-if="item1.icon !== undefined && item1.icon !== null">
              <q-icon :name="item1.icon" />
            </q-item-section>
            <q-item-section>{{ item1.label }}</q-item-section>
          </q-item>
        </q-expansion-item>
      </div>
      <!-- <q-item @click.stop="doLogout()" clickable>
        <q-item-section avatar>
          <q-icon name="la la-power-off" />
        </q-item-section>
        <q-item-section>{{ $t("logout") }}</q-item-section>
      </q-item> -->
    </q-list>
  </div>
</template>

<script>
import ViewSwitcher from "components/ViewSwitcher";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "EssentialLink",
  components: { ViewSwitcher },
  computed: {
    ...mapGetters({
      menus: "model/getMenus",
    }),
  },
  mounted() {
    if(!this.$keycloak.isTokenExpired()){
      this.$store.dispatch("model/fetchMenus");
    }
  }
});
</script>
