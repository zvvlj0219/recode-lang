<template>
  <div class="timer-wrapper">
    <div class="timer" >
      <div class="clock">clock</div>
      <div class="start">start</div>
      <div class="cancel">cancel</div>
    </div>
    <div class="recode-wrapper">
      <div class="recode">recode</div>
    </div>
  </div>
</template>

<script>
export default {
  name:'timer',
  data(){
    return {
      language:'JavaScript',
      timer:30,
    }
  }
}
</script>