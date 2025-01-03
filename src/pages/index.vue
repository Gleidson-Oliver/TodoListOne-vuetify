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
          @keyup.enter.exact="addNewTask()"
          ></v-text-field>
         
        </v-col>
        <v-col cols="2" class="pb-2"   >  
            <v-btn  @click="addNewTask()"  class="btn-addnewTask" color="primary">Adicionar <v-icon icon="mdi-plus"></v-icon></v-btn>
        </v-col>
    </v-row>

    <v-list>
      <v-list-item v-for="(task, i) in tasks" :key="task.id" :value="task.id">
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
import { ref , onMounted} from 'vue'
import { auth, collectionTasks} from '../plugins/firebase'

import { 
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from 'firebase/firestore'

export default {
  setup(){
    const newTask = ref("")
    const tasks = ref([])
    const uid = ref("")

    onMounted( async() =>{

      if(auth.currentUser){

        if (auth.currentUser) {
        uid.value = auth.currentUser.uid;

        // Buscar todas as tarefas do usuário
        const tasksQuery = query(
         collectionTasks,
          where("owner_uid", "==", uid.value)
        );

        const querySnapshot = await getDocs(tasksQuery);

        tasks.value = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      }
    }
      
      
    })
    const addNewTask = async()=>{

      if (newTask.value.trim() === "") {
        alert("Você tentou enviar uma tarefa sem descrever o título.");
        return;
      }

      if (tasks.value.find((item) => item.title.toLowerCase() === newTask.value.toLowerCase())) {
        alert("Essa tarefa já existe.");
        return;
      }

      if (auth.currentUser) {
        try {
          const taskData = {
            owner_uid: uid.value,
            title: newTask.value,
            done: false,
          };

          const docRef = await addDoc(collectionTasks, taskData);

          // Atualizar a lista de tarefas com a nova tarefa
          tasks.value.push({ id: docRef.id, ...taskData });
          newTask.value = ""; // Limpar o campo de entrada
        } catch (error) {
          console.error("Erro ao adicionar tarefa:", error);
        }
      }
    };

    return {
      newTask,
      tasks,
      addNewTask,
    };
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