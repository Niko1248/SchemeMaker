<template>
  <div class="logo">
    <img src="../../assets/img/Logo.svg" />
  </div>
</template>
<script></script>
<style lang="scss" scoped>
.logo {
  position: absolute;
  top: 71vh;
  left: 18vw;
  z-index: 1000;
  opacity: 0;
  animation: logo 3.3s ease forwards;
  animation-delay: 3s;
  will-change: transform;

  img {
    width: 15vw;
    height: 3.1vw;
    max-width: 250px;
    max-height: 52px;
    object-fit: cover;
    filter: drop-shadow(3px 2px 10px black);
  }
}
@keyframes logo {
  0% {
    opacity: 0;
    top: 76vh;
    left: 15vw;
  }
  90% {
    opacity: 1;
    top: 76vh;
    left: 15vw;
  }
  100% {
    opacity: 1;
    top: 25px;
    left: 25px;
  }
}
</style>
