<template>
  <section class="todo">
    <nav>
      <ul>
        <li
        v-for="tab in tabList" 
        v-bind:key="tab.language"
        v-on:click="tabChange(tab.language)"
        v-bind:class="{linkActive: currentComponent == tab.language}"
        >
        {{tab.language}}
        </li>
        <ModalComponent>
          <template v-slot:title>
          <div
            class="lang-add"
          >＋</div>
          </template>
          <template v-slot:modal>
            <div class="modal-content">
              <div
                v-for="lang in selectable_lang"
                v-bind:key="lang.language"
              >
                <input 
                  type="radio" 
                  v-bind:id="lang.language" 
                  v-bind:value="lang.language"
                  v-model="modal_lang"
                >
                <label v-bind:for="lang.language">{{lang.language}}</label>
              </div>
              <input 
              type="button" 
              value="追加する"
              class="lang-add-modal"
              v-on:click="langAdd()"
              >
            </div>
          </template>
        </ModalComponent>
      </ul>
    </nav>
    <keep-alive>
      <component 
        v-bind:is="currentComponent"
        v-on:langDelete="lang_delete"
        v-on:taskAdd="taskAdd"
        v-on:deleteTask="deleteTask"
        v-on:init="init"
        v-bind:propsTodos="todos"
      ></component>
    </keep-alive>
  </section>
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
import Python from './languages/Python.vue';
import Go from './languages/Go.vue';
import HTML from './languages/HTML.vue';
import CSS from './languages/CSS.vue';
import PHP from './languages/PHP.vue';
import Java from './languages/Java.vue';
import Ruby from './languages/Ruby.vue';
import Angular from './languages/Angular.vue';
import C from './languages/C.vue';
import Express from './languages/Express.vue';

export default {
  data(){
    return {
      tabList:[],
      selectable_lang:[],
      modal_lang:null,
      currentComponent:null,
      todos:[],
    }
  },
  components:{
    ModalComponent,
    'Node.js':Node,
    'React.js':React,
    'Vue.js':Vue,
    JavaScript,
    TypeScript,
    Python,
    Go,
    Express,
    CSS,
    HTML,
    PHP,
    Java,
    C,
    Ruby,
    'Angular.js':Angular,
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
        this.$store.dispatch('updateEmail',null);
        this.$store.dispatch('updateIdToken',null);
        this.$router.push('/login');
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

.todo nav {
  background-color:rgba(73,80,87,0.3);
  margin-bottom: 0;
  width:100vw;
  height:50px;
  overflow-x:scroll;
  white-space:nowrap;
}

@media (min-width:576px){
  .todo nav{
    max-width:calc(100vw - 217px);
    overflow-x:scroll;
    white-space:nowrap;
  }
}

.todo nav::-webkit-scrollbar {
  display: none;
}

.todo ul {
  display:flex;
  margin-left:20px;
}

.todo ul > li {
  line-height:45px;
  padding:0 7px;
  text-align:center;
  color:lightcyan;
  cursor:pointer;
}

.linkActive{
  border-bottom:5px solid #ff6d00;

}

.lang-add{
  align-self: center;
  margin:0 10px;
  margin-top:3px;
  height: 45px;
  font-size: 30px;
  color:#ff9e00;
  cursor:pointer;
}

.lang-add-modal {
  width:150px;
  height:35px;
  margin:20px auto;
  border:none;
  border-radius:5px;
  background-color:#3a86ff;
  display:block;
}

.modal-content{
  background-color: white;
  width: 150px;
  margin: 0 auto;
}
</style>
