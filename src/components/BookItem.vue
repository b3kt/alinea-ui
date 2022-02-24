<template>
  <div :class="'row' + classes">
    <q-card class="book-item bg-transparent q-my-xs q-mx-sm" v-if="!isNil(data)" flat>
      <div class="shadow-1">
        <q-img
          :src="getThumbnail"
          :ratio="2 / 3"
          class="book-item-img rounded-img shadow-1"
          clickable
          v-ripple
          @click="onClickEvent()"
        />
      </div>
      <q-card-section class="q-pa-sm" v-if="mode === 'simple'">
        <div class="row no-wrap items-center">
          <div class="col ellipsis text-weight-light text-capitalize">{{ getTitle }}</div>
        </div>
        <div class="row no-wrap items-center">
          <div class="col ellipsis text-weight-light text-smaller text-primary">
            {{ getAuthor }}
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card
      flat
      v-if="mode === 'detail'"
      class="bg-transparent col fit"
      style="width: 360px !important"
    >
      <q-card-section class="text-capitalize text-h6 ellipsis title q-py-xs">
        {{ getTitle }}
      </q-card-section>
      <q-card-section
        class="col ellipsis text-weight-light text-small q-py-xs text-primary"
        >{{ getAuthor }}</q-card-section
      >
      <q-card-section
        class="ellipsis-2-lines text-weight-light q-pb-sm"
        style="height: 60px"
      >
        {{ getDescription }}
      </q-card-section>
      <q-card-section v-if="isAuthenticated && !readonly">
        <q-btn
          dense
          outline
          class="q-px-sm q-mr-sm"
          icon="la la-pencil"
          :label="$t('edit')"
          @click="onEditEvent()"
        />
        <q-btn
          dense
          outline
          class="q-px-sm q-mr-sm"
          icon="la la-trash"
          :label="$t('delete')"
          @click="onDeleteEvent()"
        />
        <div class="q-btn q-btn--dense q-btn__content q-btn--outline q-btn--rectangle q-mr-sm">
          <q-checkbox
            color="positive"
            dense
            class="q-px-sm"
            v-model="getIsPublished"
            :label="$t(getIsPublished ? 'published' : 'private')"
            @click="getIsPublished ? onUnpublishEvent() : onPublishEvent()"
          />
        </div>
      </q-card-section>
      <q-card-section v-else>
        <q-btn
          dense
          size="sm"
          flat
          class="q-px-sm q-mr-sm text-primary"
          :label="$t('read_more')"
          @click="onEditEvent()"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "BookItem",
  props: {
    readonly: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      required: true,
    },
    col: {
      type: Number,
      required: false,
      default: 12,
    },
    classes: {
      type: String,
      required: false,
      default: "",
    },
    to: {
      type: String,
    },
    mode: {
      type: String,
      required: false,
      default: "simple",
    },
    onEdit: {
      type: Function,
      default: () => {
        console.log("edit");
      },
    },
    onDelete: {
      type: Function,
      default: () => {
        console.log("delete");
      },
    },
    onPublish: {
      type: Function,
      default: () => {
        console.log("pulbish");
      },
    },
    onUnpublish: {
      type: Function,
      default: () => {
        console.log("unpublish");
      },
    },
    onAddChapter: {
      type: Function,
      default: () => {
        console.log("add chapter");
      },
    },
  },
  data() {
    return {
      published: false,
    };
  },
  methods: {
    onClickEvent() {
      this.$router.push(this.to);
    },
    onEditEvent() {
      this.onEdit();
    },
    onDeleteEvent() {
      this.onDelete();
    },
    onPublishEvent() {
      this.onPublish();
    },
    onUnpublishEvent() {
      this.onUnpublish();
    },
    onAddChapterEvent() {
      this.onAddChapter();
    },
  },
  mounted() {
    this.published = this.getIsPublished;
  },
  computed: {
    getTitle() {
      return this.data !== undefined && this.data !== null ? this.data.title : "";
    },
    getAuthor() {
      return this.data !== undefined &&
        this.data !== null &&
        this.data.author !== undefined &&
        this.data.author !== null
        ? this.data.author.name
        : null;
    },
    getDescription() {
      return this.data !== undefined && this.data !== null ? this.data.description : null;
    },
    getThumbnail() {
      return this.isNotEmpty(this.data.cover_img)
        ? this.data.cover_img[0].thumbnail_url
        : this.config.defaultImageURL;
    },
    getIsPublished() {
      return !this.isNil(this.data.status)
        ? this.data.status.code === 'STORY_STATUS_RELEASED'
        : false;
    },
    getTo() {
      return this.to;
    },
  },
};
</script>

<style scoped>
.book-item,
.book-item-img {
  width: 130px;
}
.rounded-img {
  border-radius: 4px !important;
}
</style>
