<template>
  <v-container fluid>
    <div class="d-flex align-center justify-center">
      <h1>Minha Lista De Tarefas</h1>
    </div>
    <v-row>
        <v-col cols="10" >
          <v-text-field
          type="text"
          v-model="newTask"
          label="Nova tarefa"
          @keyup.enter.exact="addNewTask(newTask)"
          ></v-text-field>
         
        </v-col>
        <v-col cols="2" class="pb-2"   >  
            <v-btn  @click="addNewTask(newTask)"  class="btn-addnewTask" color="primary">Adicionar <v-icon icon="mdi-plus"></v-icon></v-btn>
        </v-col>
    </v-row>

    <v-list>
      <v-list-item v-for="(task, i) in tasks" :key="i" value="task">
        <template v-slot:prepend="{isActive}">
            <v-checkbox-btn v-model="task.done" :model-value="isActive"></v-checkbox-btn>
        </template>
       
        <v-list-item-title>{{ task.title }}</v-list-item-title>
        <template v-slot:append>
          <v-btn
            color="grey-lighten-1"
            icon="mdi-information"
            variant="text"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  setup(){
    const newTask = ref("")
    const tasks = ref([
      
      {title:"Estudar", done:false}
    ])

    const addNewTask = (task)=>{

      const search_task_repeated = tasks.value.find(item=> item.title.toLowerCase() == task.toLowerCase())
      if(newTask.value.trim() !== "" && !search_task_repeated){

        tasks.value.push({title:newTask.value, done:false})
        newTask.value = ""
      }else if (newTask.value.trim() === ""){
        alert("Você tentou enviar uma tarefa sem descrever o título, tente novamente.")
      }else{

        alert("Essa tarefa já existe.")

      }
    }
    return{
      newTask,
      tasks,
      addNewTask,
    }
  }
}
</script>

<style scoped>
  .btn-addnewTask{
    display:flex;
    justify-content: center;
    align-items: center;
    padding: 1.7rem 1rem;
  }
</style>