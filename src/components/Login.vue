
<template>
  <article class="Login">
    <div class="container" :class="{'sign-up-active' : signUp}">
      <div class="overlay-right">
        <h2>Welcome Back!</h2>
        <p>Please login with your personal info</p>
        <button class="btn btn-primary btn-block" id="signIn" @click="signUp = !signUp">Sign Up</button>
      </div>-
                      
      <div class="overlay-left">
        <h2>Hello, Friend!</h2>
        <p>Please enter your personal details</p>
        <button class="btn btn-primary btn-block" id="signUp" @click="signUp = !signUp">Sign In</button>
      </div>

      <Form class="sign-in" @submit="handleLogin" :validation-schema="schema">
        <img
          id="profile-img"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          class="profile-img-card"
        />
        <h2>Create login</h2>
        <div>Use your email for registration</div><br>

        <div class="form-group">
          <Field name="username" type="text" class="field" placeholder="Username"/>
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        
        <div class="form-group">
          <Field name="password" type="password"  class="field"  placeholder="Password"/>
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>
        
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
          {{ message }}
          </div>
        </div>
      </Form>
      
      <Form  class="sign-up" @submit="handleRegister" :validation-schema="schema1">
        <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
        />

        <div v-if="!successful">
          
          <div class="form-group">
            <Field name="username" type="text" class="field"  placeholder="Username"/>
            <ErrorMessage name="username" class="error-feedback" />
          </div>
          
          <div class="form-group">
            <Field name="email" type="email" class="field"  placeholder="Email"/>
            <ErrorMessage name="email" class="error-feedback" />
          </div>
          
          <div class="form-group">
            <Field name="password" type="password" class="field"  placeholder="Password"/>
            <ErrorMessage name="password" class="error-feedback" />
          </div>


          <div class="userType">
            Are you an artist ? 
            <Field type="radio" name="roles" value="admin" id="admin" @click="isArtist = !isArtist"/>
            <label for="admin">yes</label>
            <Field type="radio" name="roles" value="user" id="user" checked="checked" @click="isArtist = !isArtist"/>
            <label for="non">no</label>
            <div v-if="!isArtist">
              you are our best listener enjoy our content
            </div>
            <div v-else>
              ah! you know, you will be able to publish<br>
              your music with all our community
            </div>
          </div>
  
          <div class="form-group" >            
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Sign Up
            </button>
          </div>
          <div
            v-if="messageRegister"
            class="alert"
            :class="successful ? 'alert-success' : 'alert-danger'"
          >
            {{ messageRegister }}
          </div>
        </div> 
      </Form>
    </div>
  </article>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });

    const schema1 = yup.object().shape({
      username: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
    });


    return {
      signUp: false,
      successful: false,
      loading: false,
      isArtist:false,
      message: "",
      messageRegister:"",
      schema,
      schema1

    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/dashboard/profile");
    }
  },
  mounted() {
    if (this.loggedIn) {
    this.$router.push("/dashboard/profile");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/dashboard/profile");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          }
        );
      },
    
  
    handleRegister(user) {
      this.messageRegister = "";
      this.successful = false;
      this.loading = true;

      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.messageRegister = data.message;
          this.successful = true;
          this.loading = false;
          this.handleLogin(user);
        },
        (error) => {
          this.messageRegister =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        }
      );
    },
  },
};
</script>

<style  scoped>

.Login {
  background: linear-gradient(45deg, #FC466B, #3F5EFB);
  height: 100vh;
  width: 100%;
  font-family: arial, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  position: relative;
  height: 80%;
  border-radius: 1em;
  overflow: hidden;
  margin: 15px 15px 15px 15px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  -moz-backdrop-filter: blur(10px);
  box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, .5);
  text-align: center;
  justify-content:center;
  flex-direction: column;
  flex-wrap:wrap;
}  

#admin
{
  margin: 3px 3px 3px 3px; 
}
#user
{
  margin: 3px 3px 3px 3px; 
}

h2 {
  margin: 0;
}
p {
  margin: 20px 0 30px;
}

.invert {
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, .6);
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  background-image: linear-gradient(45deg , #cc208e 0%, #6713d2 100%);
  transition: all .5s ease-in-out;
}  

.invert:hover {
  border-color: none;
  background-image: linear-gradient(45deg , #6713d2 0%, #cc208e 100%);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, .2);
}

.invert:active {
  transform: scale(.9);
}

.invert:focus {
  outline: none;
}

.btn-primary
{
  max-width:300px;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  border:none;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  -moz-backdrop-filter: blur(10px);
  box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, .5);
}


Form 
{
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content:center;
  flex-direction: column;
  flex-wrap:wrap;
  padding:auto;
  width: 50%;
  height:100%;
  padding: 5px 10px 5px 10px;
  background: linear-gradient(to bottom, #efefef, #ccc);
  transition: all .5s ease-in-out;
}

.form-control
{
  text-align:center;
  font-size: 1.3em;
}

.form-group
{
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  flex-wrap: wrap;
  width: 70%;
  margin: 8px 8px 8px 8px;

}

.field {
  background-color: #eee;
  border: none;
  padding: 8px 15px;
  margin: 6px 0;
  width: calc(100% - 30px);
  border-radius: 15px;
  border-bottom: 1px solid #ddd;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, .4), 
                    0 -1px 1px #fff, 
                    0 1px 0 #fff;
  overflow: hidden;
  min-width : 150px;
  width : 70%;
  text-align:center
}
.field:focus {
  outline: none;
  background-color: #fff;
}

.sign-in {
  left: 0;
  z-index: 2;
}

.sign-up {
  left: 0;
  z-index: 1;
  opacity: 0;
}

.profile-img-card {
  position:relative;
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.overlay-left {

  /* background: linear-gradient(to bottom right, #7FD625, #009345); */
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  padding: 70px 40px;
  width: 50%;
  height: 100%;
  text-align: center;
  transform: translateX(-20%);
  transition: all .5s ease-in-out;
  border-radius: 10px;
  /*
  border-left: 1px solid rgba(255, 255, 255, .3);
  border-top: 1px solid rgba(255, 255, 255, .3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  -moz-backdrop-filter: blur(10px);
  box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, .2);
  */
  background: transparent;
}
.overlay-right {
  position: absolute;
  /* background: linear-gradient(to bottom right, #7FD625, #009345); */
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  padding: 70px 40px;
  width: 50%;
  height: 100%;
  text-align: center;
  transform: translateX(0);
  transition: all .5s ease-in-out;
  right: 0;
  border-radius: 10px;
 /*
  border-left: 1px solid rgba(255, 255, 255, .3);
  border-top: 1px solid rgba(255, 255, 255, .3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  -moz-backdrop-filter: blur(10px);
  box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, .2);
*/
  background:  transparent; 
}


.sign-up-active > .sign-in {
  transform: translateX(100%);
}

.sign-up-active > .sign-up {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.5s;
  }
  .sign-up-active > .overlay-left {
    transform: translateX(0);
  }
  .sign-up-active > .overlay-right {
    transform: translateX(20%);
  }
  
@keyframes show {
  0% {
    opacity: 0;
    z-index: 1;
  }
  49% {
    opacity: 0;
    z-index: 1;
  }
  50% {
    opacity: 1;
    z-index: 10;
  }
}

div{
  font-size: 1rem;
}

.error-feedback {
  color: red;
}


</style>
