<template>
  <div id="app">
    <div class="header">
      <div class="title">RECODE-LANG</div>
      <div class="acount-wrapper">
        <div>sample1234@gamil</div>
        <div class="dropdown-list"></div>
      </div>
    </div>
    <div class="main">
      <div class="hamburger-menu">
        <div class="menu-list">
          <router-link 
          tag="div"
          to="/dashboard"
          class="page-link"
          >ダッシュボード</router-link>
          <router-link 
          tag="div"
          to="/timer"
          class="page-link"
          >タイマー</router-link>
          <router-link 
          tag="div"
          to="/todo"
          class="page-link"
          >ToDoリスト</router-link>
          <router-link
          tag="div"
          to="/dashboard"
          class="page-link"
          >お知らせ</router-link>
          <router-link
          tag="div"
          to="/dashboard"
          class="page-link"
          >ヘルプ</router-link>
        </div>
      </div>
      <router-view class="router-content"></router-view>
    </div>
    <div class="footer">
      <ul class="footer-list">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
body{
  margin: 0;
  height: 100%;
}

/* header */
.header{
  background-color:#38b000;
  color:lightcyan;
  height: 45px;
  display: flex;
  justify-content: space-between;
}

.title{
  align-self: flex-start;
  line-height: 45px;
  margin-left: 15px;
  margin-top: 0;
}

.acount-wrapper{
  align-self: center;
  margin-left: 10px;
  margin-top: 0;
  display: flex;
}

.dropdown-list{
  width: 0px;
  height: 0px;
  align-self: center;
  margin-left: 10px;
  margin-right: 10px;
  background: transparent;
  border-top: 9px solid black;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
}

/* main */
.main{
  display: flex;
  background-color:rgba(216,243,220,0.4);
}

/* side bar */
.hamburger-menu{
  background-color:#d8f3dc;
  height: 100vh;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}

.menu-list > .page-link{
  margin:15px 40px;
}

/* dashboard */
.dashboard{
  background-color: yellowgreen;
  min-height: 100%;
  flex: 1;
  padding-bottom: 30px;
}

.date{
  background-color: darkseagreen;
  text-align: center;
  margin-bottom: 20px;
}

/* footer */
.footer{
  position: fixed;
  bottom: 0;
  background-color: bisque;
  width:100%;
  height: 55px;

}
.footer > ul{
  display: flex;
  justify-content: space-around;
}

  /* Extra Small device (desktop, less than 576px) */
@media (max-width:575px) {
  .hamburger-menu{
    display: none;
  }
}

/* Small devices (desktops, 576px and up) */
@media (min-width: 576px) and (max-width: 768px) {
  .hamburger-menu{
    min-width:170px
  }
  .menu-list{
    margin-left: -7px;
  }
  
  .footer{
    display: none;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 850px){
  .hamburger-menu{
    min-width: 210px;
  }
  .footer{
    display: none;
  }
}

/* Large and Extra Large devices (desktops, 992px and up) */
@media (min-width: 850px) {  
  .footer{
    display: none;
  }

  .hamburger-menu{
    min-width: 230px;
  }

  
}


</style>

<style scop>
/* Extra Small device (desktop, less than 576px) */
@media (max-width:575px) {
  .graph,.weekly,.monthly{
    width:80%;
    height: 300px;
    background-color:darkgray;
    margin: 5px auto;
  }

  .graph{
    height:500px;
  }
  
}

/* Small devices (desktops, 576px and up) */
@media (min-width: 576px) and (max-width: 768px) {
  .graph,.weekly,.monthly{
    width:80%;
    height: 300px;
    background-color:darkgray;
    margin: 5px auto;
  }
  .graph{
    height:400px;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 850px){
  .graph,.weekly,.monthly{    
    width:80%;
    height: 350px;
    background-color:darkgray;
    margin: 5px auto;
  }
  .graph{
    height:600px;
  }

}

/* Large devices (desktops, 992px and up) */
@media (min-width: 850px) and (max-width: 1200px){  
  .graph,.weekly,.monthly{
    width:80%;
    height: 350px;
    background-color:darkgray;
    margin: 5px auto;
  }
  .graph{
    height:600px;
  }
  
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  .content-wrapper{
    width:95%;
    /* 1224pxくらいになっている */
    height:95%;
    /* 657pxくらいになっている */
    margin: 0 auto;
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(2, 48%);
    grid-template-rows: repeat(4,145px);
    gap:10px 20px;
    background-color: lightskyblue;
  }
  .graph {
    background: hsl(0, 60%, 60%);
    grid-column: 1;
    grid-row: 1/5;
  }
  .weekly {
    background: hsl(60, 60%, 60%);
    grid-column: 2;
    grid-row: 1/3;
  }
  .monthly {
    background: hsl(180, 60%, 60%);
    grid-column: 2;
    grid-row: 3/5;
  
  }
}
</style>

