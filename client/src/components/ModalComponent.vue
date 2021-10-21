<template>
  <div id="modalComponent">
    <div id="open" v-on:click="isModal = !isModal">
      <slot name="title"></slot>
    </div>
    <div id="mask" 
    v-on:click="isModal = !isModal"
    v-bind:class="{hidden :isModal }"></div>
    <section id="modal" v-bind:class="{hidden :isModal }">
      <slot name="modal">
      </slot>
      <div id="close" v-on:click="isModal = !isModal">
        閉じる
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data(){
    return {
      isModal:true
    }
  }
}
</script>

<style >
body {
font-size: 16px;
height: 1300px;
}
/*
#open {
  cursor: pointer;
  width: 200px;
  border-radius: 4px;
  text-align: center;
  padding: 12px;
  margin: 16px auto 0;
  color: black;
  position: relative;
  top: 30%;
}
*/
#close {
  cursor: pointer;
  width: 200px;
  border: none;
  border-radius: 4px;
  text-align: center;
  padding: 12px;
  margin: 16px auto 0;
  background: #ffb600;
  color: white;
  position: relative;
  top: 30%;
}
#mask {
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 2;
}
#modal {
  background: #fff;
  color: #555;
  width: 300px;
  padding: 40px;
  border-radius: 4px;
  position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  margin: 0 auto;
  z-index: 3;
  transition: 0.4s;
}
#mask.hidden {
  display: none;
}
#modal.hidden {
  display: none;
}
</style>
