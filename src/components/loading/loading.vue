<template>
  <div class="loading" v-if="loading">
    <div class="loading-icon">
      <div></div>
      <div></div>
    </div>
    <div class="loading-text">加载中</div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.loading {
  position: relative;
  text-align: center;
  padding: 1.8rem 0;
}

.loading-text {
  line-height: 0.28rem;
  font-size: 0.16rem;
  color: #000;
  display: block;
  padding: 0.1rem 0;
}

.loading-icon,
.loading-icon > div {
  position: relative;
  box-sizing: border-box;
}

.loading-icon {
  display: inline-block;
  font-size: 0;
  color: #000;
}

.loading-icon > div {
  display: inline-block;
  float: none;
  background-color: currentColor;
  border: 0 solid currentColor;
}

.loading-icon {
  width: 0.48rem;
  height: 0.48rem;
}

.loading-icon > div:nth-child(1),
.loading-icon > div:nth-child(2) {
  position: absolute;
  left: 0;
  width: 100%;
}

.loading-icon > div:nth-child(1) {
  top: -25%;
  z-index: 1;
  height: 100%;
  border-radius: 10%;
  animation: square-jelly-box-animate 0.6s -0.1s linear infinite;
}

.loading-icon > div:nth-child(2) {
  bottom: -9%;
  height: 10%;
  background: #000;
  border-radius: 50%;
  opacity: 0.2;
  animation: square-jelly-box-shadow 0.6s -0.1s linear infinite;
}

@keyframes square-jelly-box-animate {
  17% {
    border-bottom-right-radius: 10%;
  }

  25% {
    transform: translateY(25%) rotate(22.5deg);
  }

  50% {
    border-bottom-right-radius: 100%;
    transform: translateY(50%) scale(1, 0.9) rotate(45deg);
  }

  75% {
    transform: translateY(25%) rotate(67.5deg);
  }

  100% {
    transform: translateY(0) rotate(90deg);
  }
}

@keyframes square-jelly-box-shadow {
  50% {
    transform: scale(1.25, 1);
  }
}

</style>
