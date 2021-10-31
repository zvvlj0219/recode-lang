<template>
  <div class="footer">
    <ul class="footer-list">
      <li><router-link to="/dashboard">d</router-link></li>
      <li><router-link to="/todo">todo</router-link></li>
      <li><router-link to="/timer">timer</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'Footer'
}
</script>

<style scoped>
.footer{
  display: none;
  z-index:2;

}

/* footer Extra small device (less than 576px) */
@media (max-width:576px){
  .footer{
    position: fixed;
    bottom: 0;
    background-color: bisque;
    height: 55px;
    width:100%;
    display:block;
  }
  .footer-list {
    display: flex;
    justify-content: space-around;
  }
}

</style>