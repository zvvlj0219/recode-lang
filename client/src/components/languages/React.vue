<template>
  <div class="task-management">
    <div class="all_delete"
    >
      <input type="button" 
      class="all_delete_botton"
      value="削除"
      v-on:click="all_delete()"
      >
    </div>
    <div 
      class="msg"
      v-bind:class="taskMessage ? 'task-message':'no-task-message'"
    >
      {{msg}}
    </div>
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
      <input type="button" class="submit-button" value="追加" v-on:click="record">
    </div>
  </div>
</template>

<script>
import todoService from '../../modules/todoService.js'

export default {
  name:'React.js',
  data(){
    return{
      lang:'React.js',
      msg:'',
      taskMessage:false,
      todos:[],
      newtask_text:'',
      isActive:false
    }
  },
  props:{
    propsTodos:{
      type:Array
    }
  },
  watch:{
    propsTodos:{
      handler(){
        this.init();
      },
      deep:true
    },
    todos(){
      this.toggle_message();
    }
  },
  created(){
    this.init();
    this.toggle_message();
  },
  methods:{
    init(){
      this.propsTodos.forEach(el=>{
        if(this.lang == el.language){
          let a = el.todo;
          let b = [];
          a.forEach(item=>{
            b.push(item)
          });
          this.todos = b;
        }
      });
    },
    toggle_message(){
      if(this.todos[0]){
        this.taskMessage = true;
        this.msg = '未完了のタスクがあります';
      }else{
        this.taskMessage = false;
        this.msg = 'タスクを追加してダッシュボードに記録しよう'
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
        this.$emit('taskAdd')
        this.isActive = false;
        this.newtask_text = '';
      }catch(e){
        console.log(e);
      }
    },
    async deleteTask(id){
      try{
        await todoService.commondelete(id,null);
        this.$emit('deleteTask')
      }catch(e){
        console.log(e);
      }
    },
    async all_delete(){
      try{
        await todoService.commondelete(null,this.lang);
        this.$emit('langDelete',this.lang);
      }catch(e){
        console.log(e);
      }
    },
    async record(){
      try{
        const id = [];
        this.todos.forEach(el=>{
          if(el.checked == true){
            id.push(el._id);
          }
        });
        await todoService.updateIsDone(id);
        await this.$emit('init');
      }catch(e){
        console.log(e)
      }
    },
  }
}
</script>

<style scoped>
  @import '../../modules/common.lang.css';
</style>