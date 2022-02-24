<template>
  <div v-if="isAuthenticated" v-once>
    <q-list class="rounded-borders">
      <div>
        <ViewSwitcher />
      </div>
      <div v-if="!isProfileCompleted">
        <q-item @click="onCompleteProfile()" clickable>
          <q-item-section avatar>
            <q-icon name="la la-user" />
          </q-item-section>
          <q-item-section>{{ $t("update_profile") }}</q-item-section>
        </q-item>
      </div>
      <div v-if="isNotEmpty(menus)">
        <div v-for="(item, index) in menus" :key="index">
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
            expand-icon="las la-chevron-down"
            group="menu"
            v-else
            expand-separator
            :duration="100"
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
              <q-item-section
                avatar
                v-if="item1.icon !== undefined && item1.icon !== null"
              >
                <q-icon :name="item1.icon" />
              </q-item-section>
              <q-item-section>{{ item1.label }}</q-item-section>
            </q-item>
          </q-expansion-item>
        </div>
      </div>
      <q-item
        v-if="!isNotEmpty(menus) && getCurrentRole === 'author'"
        @click.stop="onBecomeAuthor()"
        clickable
      >
        <q-item-section avatar>
          <q-icon name="las la-feather-alt" />
        </q-item-section>
        <q-item-section>{{ $t("become_author") }}</q-item-section>
      </q-item>
      <q-item @click.stop="doLogout()" clickable>
        <q-item-section avatar>
          <q-icon name="la la-power-off" />
        </q-item-section>
        <q-item-section>{{ $t("logout") }}</q-item-section>
      </q-item>
    </q-list>

    <DashboardDialog />
  </div>
</template>

<script>
import ViewSwitcher from "components/ViewSwitcher";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import DashboardDialog from "components/DashboardDialog";
import profileSchema from "components/forms/profile-form";

export default defineComponent({
  name: "EssentialLink",
  components: { ViewSwitcher, DashboardDialog },
  computed: {
    ...mapGetters({
      menus: "model/getMenus",
    }),
    getDialogModel() {
      return this.getDialogForm.model;
    },
  },
  created() {
    this.$store.dispatch("model/fetchProfile").then((resp) => {
      console.log(resp);
    });
  },
  mounted() {
    if (this.isAuthenticated) {
      this.$store.dispatch("model/fetchMenus");
    }
  },
  methods: {
    onCompleteProfile() {
      this.$store.commit("ui/showDashboardDialog", {
        title: this.$t("complete_profile"),
        schema: profileSchema,
        events: {
          onSave: () => {
            this.onSaveProfile();
          },
        },
      });
    },
    onSaveProfile() {
      if (this.getDialogModel !== undefined && this.getDialogModel !== null) {
        const vars = {
          name:
            this.getDialogModel.name !== undefined
              ? this.getDialogModel.name
              : this.getProfile.name,
          bio:
            this.getDialogModel.bio !== undefined
              ? this.getDialogModel.bio
              : this.getProfile.bio,
          email:
            this.getDialogModel.email !== undefined
              ? this.getDialogModel.email
              : this.getProfile.email,
          phone:
            this.getDialogModel.phone !== undefined
              ? this.getDialogModel.phone
              : this.getProfile.phone,
          website:
            this.getDialogModel.website !== undefined
              ? this.getDialogModel.website
              : this.getProfile.website,
        };
        const resp = this.$store.dispatch("model/createProfile", vars);
        if (resp !== undefined && resp !== null) {
          resp.then(() => {
            this.$q.notify({
              color: "positive",
              message: this.$t("succesfully_saved"),
            });
            this.$store.commit("ui/hideDashboardDialog");
            this.$store.commit("model/setProfile", null);
          });
        }
      }
    },
  },
});
</script>
