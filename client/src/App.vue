<template>
  <div id="app">
    <div class="header">
      <div class="title"></div>
      <div class="acount-wrapper">
        <div>sample1234@gamil</div>
        <div class="dropdown-list"></div>
      </div>
    </div>
    <div class="main">
      <div class="hamburger-menu">
      <!-- 左カラム -->
        <ul class="menu-list">
          <li>ダッシュボード</li>
          <li>タイマー</li>
          <li>ToDoリスト</li>
          <li>お知らせ</li>
          <li>ヘルプ</li>
        </ul>
      </div>
      <router-view class="content-wapper"></router-view>
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
    background-color: thistle;
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
  }

  /* side bar */
  .hamburger-menu{
    background-color: yellow;
    height: 100vh;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }

  .menu-list{
    list-style: none;
  }

  .menu-list li{
    margin-bottom: 10px;
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

  /* Extra Small device (desktop, less than 576px) */
  @media (max-width:575px) {
    .hamburger-menu{
      display: none;
    }
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
    .hamburger-menu{
      min-width:170px
    }
    .menu-list{
      margin-left: -7px;
    }
    
    .footer{
      display: none;
    }
    
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
    .hamburger-menu{
      min-width: 210px;
    }
    .footer{
      display: none;
    }
    
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
    .footer{
      display: none;
    }
    
    /*以下 新規追加 */
    .hamburger-menu{
      min-width:230px
    }
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
    .hamburger-menu{
      width:230px
    }
    .footer{
      display: none;
    }

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
</style>

