<template>
    <div class="Dashboard">
        <Sidebar/>
        <div class="content">
        <router-view/>
            <div class="nav">

                <div v-if="currentUser" class="profile">
                    <router-link to="/dashboard/profile" class="user" >
                        <font-awesome-icon icon="user"/>
                        {{ currentUser.username }}
                    </router-link>
                </div>

                <div @click.prevent="logOut" class="logout">
                    <a>
                        <font-awesome-icon icon="sign-out-alt" /> 
                    </a>
                    <p> LogOut </p>
                </div>
            </div>    
        </div>
    </div>
</template>

<script>
import Sidebar from './Sidebar'
export default {
    name: 'dashboard',
    components: {
        Sidebar,
    },
    methods: {
        logOut() {
            this.$store.dispatch('auth/logout');
            this.$router.push('/login');
        }
    }, computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  }
}
</script>

<style>

.Dashboard {
    
    display: grid;
    grid-template-columns: 1fr 5fr;
    background-color: #202020;
    min-height: 100vh;
    /*
    width: 100vw;
    */
}

.content {
    border-radius: 10px;
    margin: 10px 15px 15px 0px;
    background-image: linear-gradient(to left, #cc208e 0%, #6713d2 100%);                
}

.nav{
    border-radius: 50%;
    position: absolute;
    top: 0;
    right: 0;
    margin: 30px 30px 30px 30px;  
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.profile
{
    text-decoration:none;
    height:70px;
    width:70px;
    border-radius:50%;
    font-size: 1.2em;
    color:black;
    font-weight: bold;
    display:flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin: 0px 0px 15px 0px;
    background-image: url("https://f.hellowork.com/blogdumoderateur/2011/07/faceyourmanga-100x100.jpg");
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    -moz-backdrop-filter: blur(10px);
    box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, .35);
    border: 3px solid rgb(167, 167, 167);

}

.user
{
    text-decoration:none;
    transition: all 0.3s linear;
    color: rgb(167, 167, 167);
}
.user:hover{
    text-decoration:none;
    color: #cc208e;
}
.logout
{
    font-size: .9em;
    text-decoration:none;
    border-radius:50%;
    height:70px;
    width:70px;
    padding: 7px 3px 3px 3px;
    background-image: linear-gradient(45deg, #cc208e 0%, #6713d2 100%);                
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    -moz-backdrop-filter: blur(10px);
    box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, .35);
    transition: all .5s linear;
    font-weight: bold;
    color: rgb(167, 167, 167);
    border: 3px solid rgb(167, 167, 167);
}
.logout:hover
{
    cursor: pointer;
    text-decoration:none;
    color: red;
    
}

</style>