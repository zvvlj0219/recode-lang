<template>
  <div class="task-management">
    <div 
    v-if="todos != ''"
    class="task-message">未完了のタスクがあります</div>
    <div 
    v-if="todos == ''"
    class="notask">タスクを追加してダッシュボードに記録しよう</div>
    <div class="task-list">
      <div
        class="task"
        v-for="element in todos"
        v-bind:key="element._id"
      >
        <div class="text">
          <input type="checkbox" style="margin-top:10px;">
          {{element.text}}
        </div>
        <span class="task-delete" v-bind:value="element._id">✕</span>
      </div>
    </div>
    <div type="button" class="taskadd"><span>＋</span></div>
    <div 
    v-if="todos"
    class="submit-button-wrapper">
      <div>完了したタスクはダッシュボードに追加できます</div>
      <input type="button" class="submit-button" value="追加">
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      todos:[]
    }
  },
}
</script>

<style scoped>
.task-management{
  margin-top: 30px;
  margin-left: 30px;
}

.task-message{
  color:lightcoral;
}

.notask{
  color:blue;
}

.task-list{
  padding-left: 10px;
}

.task{
  display:flex;
  justify-content:space-between;
  width: 70%;
  height:30px;
  margin-top: 10px;
  padding-top:2px;
  padding-bottom:2px;
}
.task:hover{
  border-top: 2px solid rgba(146, 146, 146,0.7 );
  border-bottom: 2px solid rgba(146, 146, 146,0.7);
  padding-top: 0;
  padding-bottom: 0;
}

.text{
  margin-bottom:5px;
}

.task-delete{
  display:block;
  line-height:30px;
}

.taskadd{
  margin-top:20px;
  margin-left: 25%;
  margin-bottom:20px;
  border-radius: 50%;
  width:45px;
  height: 45px;
  background-color: #9ef01a;
  box-shadow:  3px 3px 3px 0 rgba(146, 146, 146, 0.5);
  cursor:pointer;
}

.taskadd > span{
  display: block;
  text-align: center;
  line-height: 45px;
  font-size: 30px;
  color:#007200;
}

.submit-button-wrapper{
  margin-left: 30px;
}

.submit-button-wrapper > div{
  color:dimgray
}

.submit-button{
  margin-top:20px;
  margin-left: 25%;
  width:150px;
  height: 40px;
  font-size: 13px;
  background-color: #70e000;
  border:1px solid #70e000;
  border-radius: 5px;
  box-shadow:  2px 2px 1px 0 rgba(146, 146, 146, 0.5);
  cursor:pointer;
}
</style>