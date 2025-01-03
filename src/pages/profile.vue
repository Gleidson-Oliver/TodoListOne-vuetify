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

import { doc, setDoc, getDoc} from 'firebase/firestore'

const first_name = ref("")
const last_name = ref("")

const uid = ref("")


onMounted( async()=>{
  
  if(auth.currentUser){

    uid.value = auth.currentUser.uid
    
    const queryUser = doc(collectionProfile, uid.value)

    const querySnapshot = await getDoc(queryUser)

    if(querySnapshot.exists()){
       
      const user = querySnapshot.data()

      first_name.value = user.first_name
      last_name.value = user.last_name

    }else{
      console.log(`o usuario ${uid.value} não possui um perfil`)
    }
  
  }else if(!auth.currentUser) {
  console.error("Usuário não autenticado");
  return;
}

}) 

const saveData = async ()=>{


 
  if(uid.value.trim() !== ""){

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



</script>

<style>

</style>