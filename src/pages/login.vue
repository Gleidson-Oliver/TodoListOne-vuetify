<template >
 <v-container class="container-login  text-center fluid ">
   <v-row class="elevation-3 mx-auto ">
     <v-col col="auto">
       <img src="@/assets/images/logo.png" class="logo " alt="logo">
      </v-col>
    </v-row>
    <v-row>
      <v-col class="primary--text text-center mx-auto pb-4"
      cols="12"
      sm="4"
      offset="4">
        <h1 class="h1 purple-text">Login</h1>
      </v-col>
      <v-col cols="12 login-col">
        <v-form>

          <v-text-field
          type="email"
          v-model="user.email" 
          label="Email">
          </v-text-field>

          <v-text-field 
          :type="show ? 'text' : 'password' " 
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off' "
          @click:append="show= !show"
          v-model="user.password"
          label="Senha"></v-text-field>

          <v-btn @click="Login" color="primary" min-width="100">
            <v-progress-circular color="white" v-show="loadingComp" indeterminate :size="25" :width="2"></v-progress-circular>
            <span v-show="!loadingComp">Entrar</span>
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-snackbar color="red" v-model="errorLogin" danger multiline timeout="2000">
      Usuário ou senha inválido.
      <template v-slot:actions>
        <v-btn
          color="white"
          @click="errorLogin = false"
          append-icon="mdi-close"
        >
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog v-model="createNewAccountDialog" persistent max-width="300" >
        <v-card>
          <v-card-title>
            Conta não encontrada.
          </v-card-title>
          <v-card-text text-center>
            A conta não foi localizada, deseja criar uma nova conta ?
          </v-card-text>
          <v-card-actions >
            <v-spacer></v-spacer>
            <v-btn v-show="!loadingComp" color="primary" @click="CreatingAccount">Sim</v-btn>
            <v-btn v-show="!loadingComp" color="red" @click="createNewAccountDialog = false">Não</v-btn>
            <v-progress-circular class="pa-4 me-3" color="primary" v-show="loadingComp" indeterminate :size="25" :width="2"></v-progress-circular>
          </v-card-actions>
          
        </v-card>
      </v-dialog>
 </v-container>
</template>

<route lang="yaml">
  meta:
    layout: empty
</route>

<script>
import { useRouter } from 'vue-router';
import { auth } from '../plugins/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

export default {
  setup() {
      
      const user = ref(
      {email:"", password: ""}
      )

      const router = useRouter()

      const loadingComp = ref(false)

      const errorLogin = ref(false)

      const createNewAccountDialog = ref(false)


     
      
      
      const Login = async ()=>{
       try{

        loadingComp.value = true
        await signInWithEmailAndPassword(auth, user.value.email, user.value.password)
        loadingComp.value = false
        router.push({name : "/"})
       }catch(error){
        
        console.log("deu erro", error)

        const errorCode = error.code

        switch(errorCode){
          case "auth/wrong-password":
            errorLogin.value = true
            loadingComp.value = false
            break
          case "auth/invalid-email":
            errorLogin.value = true
            loadingComp.value = false
            break
          case "auth/missing-password":
            errorLogin.value = true
            loadingComp.value = false
            break
          case "auth/invalid-credential":
            createNewAccountDialog.value = true
            loadingComp.value = false
            break
        }

       }
      }


      const show = ref(false) 
      
      const CreatingAccount = async ()=>{

        loadingComp.value = true
        await createUserWithEmailAndPassword( auth, user.value.email, user.value.password )
        
        loadingComp.value = false
        createNewAccountDialog.value=false

        Login()

      }

      return{
        
        user,
        show,
        Login,
        loadingComp,
        errorLogin,
        createNewAccountDialog,
        CreatingAccount,

       
      }
  },
}
</script>
<style scoped>
 .container-login{
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
  height:100vh;

  
}

.logo{
height: 220px;
max-width: 220px;
}

.login-col{
padding:3rem;
}
</style>