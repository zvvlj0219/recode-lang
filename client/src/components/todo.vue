<template>
  <div class="todo">
    <div class="tabbar-wrapper">
      <div  
        class="tab"
        v-for="tab in tabList" 
        v-bind:key="tab.language"
        v-on:click="tabChange(tab.language)"
        v-bind:class="{linkActive: currentComponent == tab.language}"
      >
        {{tab.language}}
      </div>
      <ModalComponent>
        <template v-slot:title>
        <div
          class="lang-add"
        >＋</div>
        </template>
        <template v-slot:modal>
          <div class="modal-content">
            <div class="modal-body">
              <select 
                class="select"
                v-model="modal_lang"
              >
                <option 
                v-for="lang in selectable_lang"
                v-bind:key="lang.language"
                >{{lang.language}}</option>
              </select>
            </div>            
            <input 
            type="button" 
            value="close"
            >
            <input 
            type="button" 
            value="追加する"
            v-on:click="langAdd()"
            >
          </div>
        </template>
      </ModalComponent>
    </div>
    <keep-alive>
      <component 
        v-bind:is="currentComponent"
        v-on:langDelete="lang_delete"
        v-on:taskAdd="taskAdd"
        v-on:deleteTask="deleteTask"
        v-bind:propsTodos="todos"
      ></component>
    </keep-alive>
  </div>
</template>


<script>
//modules load
import _ from 'lodash';
import all_langs from '../modules/languages.js';
import todoService from '../modules/todoService.js';
import ModalComponent from './ModalComponent';

//lang component load
import Node from './languages/Node.vue';
import React from './languages/React.vue';
import Vue from './languages/Vue.vue';
import JavaScript from './languages/JavaScript.vue';
import TypeScript from './languages/TypeScript.vue';

export default {
  data(){
    return {
      email:'sample1234@mouse.com',
      tabList:[],
      selectable_lang:[],
      modal_lang:null,
      currentComponent:null,
      todos:[]
    }
  },
  components:{
    ModalComponent,
    'Node.js':Node,
    'React.js':React,
    'Vue.js':Vue,
    JavaScript,
    TypeScript,
  },
  async created(){
    await this.init();
    await this.tabChange(this.tabList[0].language)
  },
  methods:{
    async init(){
      try{
        //get tabList and todos
        const response = await todoService.getLang();
        
        //分割代入
        let {list} = response;
        let {todo} = response;

        //todo data 処理
        let arr1 = [];
        all_langs.forEach(el=>{
          let obj = {language:el.language,todo:[]}
          arr1.push(obj)
        });
        
        arr1.forEach((el,index)=>{
          let a1 = el.language;
          todo.forEach(item=>{
            let b2 = item.language;
            if(a1 == b2){
              arr1[index].todo.push(item);
            }
          })
        });

        //data 代入
        this.tabList = list;
        this.todos = arr1;

        //compare arrays
        this.selectable_lang = all_langs.filter(element=>{
          // if match found return false
          return _.findIndex(list, {'language': element.language}) !== -1 ? false : true;
        });
        this.modal_lang = this.selectable_lang[0].language;
      }catch(e){
        console.log(e)
      }
    },
    tabChange(lang){
      this.currentComponent = lang;
    },
    async langAdd(){
      this.tabList.push({
        language:this.modal_lang
      });
      await todoService.updateLang(this.tabList);
      this.init()
    },
    async taskAdd(){
      try{
        await this.init();
        this.tabChange(this.currentComponent)
      }catch(e){
        console.log(e)
      }
    },
    async deleteTask(){
      try{
        await this.init();
        this.tabChange(this.currentComponent)
      }catch(e){
        console.log(e)
      }
    },
    async lang_delete(lang){
      try{
        const refleshedList = this.tabList.filter(element =>{
          return (element.language !== `${lang}`);
        });
        await todoService.updateLang(refleshedList);
        this.init();
        this.tabChange(this.tabList[0].language)
      }catch(e){
        console.log(e)
      }
    },
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

.linkActive{
  border-bottom:5px solid #38b000;
}

.lang-add{
  align-self: center;
  margin-left:10px;
  margin-top:3px;
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
  width: 80%;
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

/* modal style */
#modalComponent{
  height:100%;
  width:100px;
  margin-left:10px;
}

</style>
