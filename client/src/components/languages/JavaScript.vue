<template>
  <div class="task-management">
    <div class="all_delete"
    >
      <input type="button" 
      class="all_delete_botton"
      value="all delete"
      v-on:click="all_delete()"
      >
    </div>
    <div v-show="todos" class="task-message">未完了のタスクがあります</div>
    <div v-show="!todos" class="no-task-message">タスクを追加してダッシュボードに記録しよう</div>
    <div class="task-list">
      <div
        class="task"
        v-for="element in todos"
        v-bind:key="element._id"
      >
        <div class="text">
          <input 
          type="checkbox" 
          v-model="element.checked"
          v-on:change="checked(element._id,element.checked)"
          >
          <span v-bind:class="{checked:element.checked}">{{element.text}}</span>
        </div>
        <span class="task-delete" 
        v-bind:value="element._id"
        v-on:click="deleteTask(element._id)"
        >✕</span>
      </div>
    </div>
    <div
      class="newtask_form"
      v-show="isActive"
    >
      <input type="text" placeholder=" new task here" class="newtask_text"
      v-model="newtask_text" 
      v-bind:class="{active:isActive}"
      >
      <input type="button" value="Add" class="newtask_button" v-on:click="taskAdd()">
      <input type="button" value="Cancel" class="newtask_button cancel"  v-on:click="isActive = false">
    </div>
    <div 
      type="button" 
      class="taskadd"
      v-on:click="callTaskForm()"
    ><span>＋</span></div>
    <div 
    v-if="todos"
    class="submit-button-wrapper">
      <div>完了したタスクはダッシュボードに追加できます</div>
      <input type="button" class="submit-button" value="追加">
    </div>
  </div>
</template>

<script>
import todoService from '../../modules/todoService.js'

export default {
  name:'JavaScript',
  data(){
    return{
      lang:'JavaScript',
      todos:[],
      newtask_text:'',
      isActive:false
    }
  },
  created(){
    this.init();
  },
  methods:{
    async init(){
      try{
        this.todos = await todoService.getTodos(this.lang);
      }catch(e){
        console.log('error')
      }
    },
    async checked(id,checked){
      try{
        switch (checked){
          case true:
            await todoService.updateTodos(id,checked);
          break;
          case false:
            await todoService.updateTodos(id,checked);
          break;
        }
      }catch(e){
        console.log('error')
      }
    },
    callTaskForm(){
      this.isActive = true;
      const form = document.querySelector('.newtask_text');
      setTimeout(()=>{
        form.focus();
      })
    },
    async taskAdd(){
      try{
        await todoService.insertTodos(this.lang,this.newtask_text);
        await this.init();
        this.isActive = false;
        this.newtask_text = '';
      }catch(e){
        console.log(e);
        console.log('error from javascript.vue')
      }
    },
    async deleteTask(id){
      try{
        await todoService.commondelete(id,null);
        await this.init();

      }catch(e){
        console.log(e);
        console.log('error from javascript.vue')

      }
    },
    async all_delete(){
      try{
        await todoService.commondelete(null,this.lang);
        this.$emit('langDelete',this.lang);
        await this.init();
      }catch(e){
        console.log(e);
        console.log('error from javascript.vue')
      }
    }
  }
}
</script>

<style scoped>
  @import '../../modules/common.lang.css';
</style>