<template>
  <div class="standard-file">
    <a href="">
      <div
        style="
          display: inline-block;
          border: 2px solid white;
          border-radius: 10px;
          padding: 3px 5px;
          background-color: transparent;
        "
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2V16M12 16L8 12M12 16L16 12"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path d="M20 20H4V18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </a>
    <p>Cкачать эталон</p>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.standard-file {
  position: absolute;
  font-size: 1.1vw;
  font-family: WixMadeforDisplay-Regular;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  height: 60px;
  width: 60px;
  left: 67vw;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.537254902);
  overflow: hidden;
  transition: 0.4s;
  cursor: url(../../public/cursor-pointer.png), auto;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.8);
  &:hover {
    width: 190px;
    transition: 0.2 ease-in-out;
    background: rgba(255, 255, 255, 0.2470588235);
  }
  a {
    cursor: url(../../public/cursor-pointer.png), auto;

    transform: translateX(10px);
  }
  p {
    visibility: hidden;
    margin-left: 20px;
    opacity: 0;
  }
  &:hover p {
    animation: standard 1s ease forwards;
  }
  &:hover path,
  &:hover div {
    stroke: black;
    border: 2px solid rgb(0, 0, 0) !important;
    transition: 0.4s ease;
    box-shadow: 0px 0px 10px #000;
  }
  @keyframes standard {
    0% {
      visibility: hidden;
      opacity: 0;
    }
    20% {
      visibility: hidden;
      opacity: 0;
    }
    100% {
      visibility: visible;
      opacity: 1;
    }
  }
}
</style>
