<template>
  <div class="todo">
    <div class="tabbar-wrapper">
      <router-link 
      class="tab"
      tag="div"
      v-for="tab in tabList" 
      v-bind:key="tab.language"
      v-bind:to="tab.language"
      v-on:click="tabChange(tab.language)"
      
      exact-active-class="router-link-active"
      >{{tab.language}}
      </router-link>
      <div 
      type="button" 
      class="lang-add"
      v-on:click="isModal = true"
      >＋</div>
      <div 
      v-if="isModal"
      class="modal" 
      >
        <div class="modal-content">
          <div class="modal-body">
            <select class="select">
              <option 
              v-for="lang in selectable_lang"
              v-bind:key="lang.language"
              >{{lang.language}}</option>
            </select>
          </div>            
          <input 
          type="button" 
          value="close"
          v-on:click="isModal = false">
          <input 
          type="button" 
          value="追加する"
          v-on:click="langAdd()">
        </div>
      </div>
    </div>
    <router-view v-on:langDelete="lang_delete"></router-view>
  </div>
</template>

<script>
import _ from 'lodash';
import all_langs from '../modules/languages.js';
import todoService from '../modules/todoService.js';

export default {
  data(){
    return {
      email:'sample1234@mouse.com',
      tabList:[],
      selectable_lang:[],
      isModal:false,
    }
  },
  created(){
    this.init();
  },
  methods:{
    async init(){
      try{
        //get tabList
        const res = await todoService.getLang();
        this.tabList = res.list;
        //routing
        const initialUrl = this.tabList[0].language;
        this.$router.push(`/${initialUrl}`).catch(() => {});
        //compare arrays
        const target = this.tabList
        this.selectable_lang = all_langs.filter(element=>{
          // if match found return false
          return _.findIndex(target, {'language': element.language}) !== -1 ? false : true;
        });
      }catch(e){
        console.log('error')
      }
    },
    async langAdd(){
      const lang = document.querySelector('.select').value;
      this.tabList.push({
        language:lang
      });
      this.isModal = false;
      await todoService.updateLang(this.tabList);
      this.$router.push(`/${lang}`);
    },
    async lang_delete(lang){
      try{
        const refleshedList = this.tabList.filter(element =>{
          return (element.language !== `${lang}`);
        });
        await todoService.updateLang(refleshedList);
        await this.init();
      }catch(e){
        console.log('error')
      }
    }
  },
}
</script>

<style scoped>
.todo{
  height: 100vh;
}

.tabbar-wrapper{
  background-color: #ccff33;
  display: flex;
  margin-bottom: 0;
  width:100vw;
  height:50px;
}

.tab {
  margin-left:30px;
  line-height:50px;
  cursor:pointer;
}

.router-link-active{
  border-bottom:5px solid #38b000;
}

.lang-add{
  align-self: center;
  margin-left:30px;
  margin-bottom: 17px;
  width:30px;
  height: 30px;
  font-size: 30px;
  color:#004b23;
  cursor:pointer;
}

.modal {
  display:block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.5);
}


.modal-content{
  background-color: white;
  width: 500px;
  margin: 40% auto;
}

@media (min-width:576px) {
  .todo{
    width:520px;
  }
}

@media (min-width:768px){
  .todo{
    width:590px;
  }
}

@media (min-width:992px) {
  .todo{
    width:760px;
  }
}


</style>