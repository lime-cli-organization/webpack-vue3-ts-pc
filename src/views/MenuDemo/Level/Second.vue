<template>
  <div class="home">
    <!-- swiper3 -->
    <div class="">切换效果-cube</div>
    <div class="banner-wrapper">
      <div class="swiper-container swiper3">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="@/assets/logo.png" alt="" />
          </div>
          <div class="swiper-slide">
            <img src="@/assets/1.png" alt="" />
          </div>
          <div class="swiper-slide">
            <img src="@/assets/2.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Swiper, { Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation } from "swiper";
Swiper.use([Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation]);

// swiper-bundle.min.css 决定了小圆点和左右翻页标签，如果不需要可以不引用
import "swiper/swiper-bundle.min.css";

// swiper.less/sass/css 决定了基础的样式
import "swiper/swiper.min.css";

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    onMounted(() => {
      new Swiper(".swiper3", {
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        effect: "cube",
        cubeEffect: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 100,
          shadowScale: 0.6,
        },
      });
    });
  },
});
</script>

<style scoped>
.banner-wrapper {
  width: 500px;
  height: 309px;
}
.title {
  text-align: center;
  line-height: 50px;
}

.swiper-slide img {
  width: 100%;
}
</style>
