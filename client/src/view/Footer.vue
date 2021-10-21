<template>
  <div class="footer">
    <ul class="footer-list">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'Footer'
}
</script>

<style scoped>
/* footer Extra small device (less than 576px) */
@media (max-width:576px){
  .footer{
    position: fixed;
    bottom: 0;
    background-color: bisque;
    width:100%;
    height: 55px;
  }
  .footer-list {
    display: flex;
    justify-content: space-around;
  }
}

/* more than 576px; */
@media (min-width: 577px) {
  .footer{
    display: none;
    z-index:2;
  }
}


</style>