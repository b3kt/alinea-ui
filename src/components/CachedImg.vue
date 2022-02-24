<template>
  <div>
    <q-img
      v-if="imgDataSrc"
      :src="imgDataSrc"
      :alt="alt"
      :ratio="ratio"
      :class="classes"
      clickable
      v-ripple
      @click="clickEvent()"
    />
  </div>
</template>

<script>
import localforage from "localforage";
export default {
  name: "CachedImg",
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    ratio: {
      type: Number,
      required: true,
    },
    classes: {
      type: String,
      required: true,
    },
    clickEvent: {
      type: Function,
      required: false,
    },
  },
  data: function () {
    return {
      imgDataSrc: null,
    };
  },
  methods: {
    toDataUrl(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
          callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    },
    getImageFromAppData() {
      localforage.getItem(this.src).then((data) => {
        if (data !== undefined && data !== null) {
          this.imgDataSrc = data;
        } else {
          this.saveImageToAppData();
        }
      });
    },
    setDataImgs(value) {
      localforage.setItem(this.src, value);
      this.imgDataSrc = value;
    },
    saveImageToAppData() {
      this.toDataUrl(this.src, this.setDataImgs);
    },
  },
  created() {
    this.getImageFromAppData();
  },
};
</script>
