<template>
 
    <!-- Conteúdo principal -->
      <v-container >
        <div class="d-flex justify-center">
          <h1>Meu Perfil</h1>
        </div>
        <v-form>
          <v-text-field :firstname_user="first_name" v-model="first_name" label="Nome"></v-text-field>
          <v-text-field :lastname_user="last_name"  v-model="last_name" label="Sobrenome"></v-text-field>
          <v-btn color="primary" @click="saveData">Salvar</v-btn>
        </v-form>
      </v-container>

</template>

<script setup>

import { ref , onMounted} from 'vue'
import { auth, collectionProfile} from '../plugins/firebase'

import { doc, setDoc } from 'firebase/firestore'

const first_name = ref("")
const last_name = ref("")

const uid = ref("")


const saveData = async ()=>{

  console.log("dentro da função saveDate, ", uid.value)
 
  if(uid.value.trim() !== ""){

    console.log("dentro do IF da função saveDate, ", uid.value)

    
    const profileRef = doc(collectionProfile, uid.value)

    await setDoc(profileRef, {
    uid: uid.value,
    first_name: first_name.value,  // ou vazio: ""
    last_name:last_name.value  // ou vazio: ""

  });
  
   
  alert("Alterações realizadas com sucesso!");


  }else{
    console.log(" usuário não autenticado ")
  }

 

}



onMounted( async()=>{
  
  if(auth.currentUser){

    uid.value = auth.currentUser.uid
    
    console.log(uid.value)
  
  }

}) 


</script>

<style>

</style>