<template>
  <q-carousel
    v-model="slide"
    swipeable
    animated
    control-color="white"
    navigation
    padding
    arrows
    height="300px"
    class="bg-primary text-white shadow-1 rounded-borders"
    navigation-icon="la la-minus">
    <q-carousel-slide v-for="i in 5" :key="i" name="style" class="column no-wrap">
      <CarouselItem />
    </q-carousel-slide>
  </q-carousel>
</template>
<script>
import { ref } from "vue";
import CarouselItem from "components/CarouselItem"

export default {
  components: { CarouselItem },
  setup() {
    return {
      slide: ref("style"),
      lorem:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.",
    };
  },
};
</script>
