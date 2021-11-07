<template>
  <section class="footer">
    <ul class="footer-list">
      <li>
        <router-link to="/dashboard">
          <font-awesome-icon 
            icon="chart-pie" 
            class="font"
          />
        </router-link>
      </li>
      <li>
        <router-link to="/timer">
          <font-awesome-icon 
            icon="clock" 
            class="font"
          />
        </router-link>
      </li>
      <li>
        <router-link to="/todo">
          <font-awesome-icon 
            icon="th-list" 
            class="font"
          />
        </router-link>
      </li>
    </ul>
  </section>
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

.footer .font{
  width:30px;
  height:30px;
}

/* footer Extra small device (less than 576px) */
@media (max-width:576px){
  .footer{
    position: fixed;
    bottom: 0;
    background-color:#fff;
    height: 55px;
    width:100%;
    display:block;
  }
  .footer-list {
    margin-top:10px;
    display: flex;
    justify-content: space-around;
  }

  .font{
    color:#333;
  }
}

</style>