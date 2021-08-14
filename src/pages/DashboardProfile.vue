<template>
  <q-page padding>
    <div class="row q-col-gutter-md" v-if="getCurrentRole === 'author'">
      <div class="col-lg-6 col-12">
        <Widget :title="$t('author_profile')">
          <ProfileCard />
        </Widget>
      </div>
      <div class="col-lg-6 col-12">
        <Widget :title="$t('my_chapter_draft')">
          <!-- <ChapterDraftList /> -->
        </Widget>
      </div>
    </div>
    <div class="row q-col-gutter-md" v-else>
      <div class="col-lg-6 col-12">
        <Widget :title="$t('personal_information')">
          <FormPreview :data="getProfile" :onEdit="onEditProfile" />
        </Widget>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import Widget from "components/Widget";
import ProfileCard from "components/ProfileCard";
import FormPreview from "components/FormPreview";
import authorProfileSchema from "components/forms/author-profile-form";

export default {
  name: "DashboardProfile",
  components: { Widget, ProfileCard, FormPreview },
  mounted() {
    this.initProfile();
  },
  methods: {
    populateFormModel() {
      if (!this.isNil(this.getProfile)) {
        authorProfileSchema.name.value = this.getProfile.name;
        authorProfileSchema.bio.value = this.getProfile.bio;
        authorProfileSchema.email.value = this.getProfile.email;
        authorProfileSchema.phone.value = this.getProfile.phone;
        authorProfileSchema.website.value = this.getProfile.website;
      }
    },
    initProfile() {
      this.$store.dispatch("model/fetchProfile");
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
          uid: this.getUserUID,
        };
        const resp = this.$store.dispatch("model/updateProfile", vars);
        if (resp !== undefined && resp !== null) {
          resp.then(() => {
            this.$q.notify({
              color: "positive",
              message: this.$t("succesfully_saved"),
            });
            this.$store.commit("ui/hideDashboardDialog");
            this.$store.commit("model/setProfile", null);
            this.initProfile();
          });
        }

        // if(this.getDialogModel.cover !== undefined){
        //   this.doUpload({
        //     file: this.getDialogModel.cover,
        //     name: 'profile',
        //     field: 'cover',
        //     id: this.getUserUID
        //   }).then(() => {
        //     this.$store.commit("ui/hideDashboardDialog");
        //     this.$store.commit("model/setProfile", null);
        //   });
        // }

        // if(this.getDialogModel.avatar !== undefined){
        //   this.doUpload({
        //     file: this.getDialogModel.avatar,
        //     name: 'profile',
        //     field: 'avatar',
        //     id: this.getUserUID
        //   }).then(() => {
        //     this.$store.commit("ui/hideDashboardDialog");
        //     this.$store.commit("model/setProfile", null);
        //   });
        // }
      }
    },
    onEditProfile() {
      this.populateFormModel();
      this.$store.commit("ui/showDashboardDialog", {
        title: this.$t("edit_profile"),
        schema: authorProfileSchema,
        events: {
          onSave: this.onSaveProfile,
        },
      });
    },
  },
  computed: {
    ...mapGetters({
      getProfile: "model/getProfile",
      getDialogForm: "ui/getDialogForm",
    }),
    getDialogModel() {
      return this.getDialogForm.model;
    },
  },
};
</script>
