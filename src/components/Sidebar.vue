<template>
    <div class="Sidebar">
        <div class="menu-items">
            <div class="title">
                <img class="logo" src="../assets/Musy_1.gif" alt="Logo">
            </div>
            <router-link v-if="showArtistBoard" to="/dashboard/artist" active-class="active" tag="button" exact class="side-btn">
                <div class="link-container">
                    <font-awesome-icon icon="user-plus"/> Artist Board
                </div>
            </router-link>

            
            <router-link v-if="currentUser" to="/dashboard/user" active-class="active" tag="button" exact class="side-btn">
                <div class="link-container">
                    <font-awesome-icon icon="home"/> Home
                </div>        
            </router-link>
            <router-link to="/dashboard/playlists" active-class="active" tag="button" exact class="side-btn">
                <div class="link-container">
                    <font-awesome-icon icon="play"/> Player
                </div>
            </router-link>
            <router-link to="/dashboard/about" active-class="active" tag="button" exact class="side-btn">
                <div class="link-container">
                    <font-awesome-icon icon="tornado"/> About us
                </div>
            </router-link>
        </div>
    </div>
</template>


<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showArtistBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN');
      }
      return false;
    }
  },
  methods: {
  }
};
</script>



<style scoped>



.logo
{
    width: 150px;
    margin: 0;
}
.title {
    margin-top: 10px;
}

.menu-items {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    margin-left: 6px;
    position:sticky;
    top: 0;
}

.menu-items > * {
    margin-top: 60px;
}

.side-btn {
    border: none;
    padding: 16px 0px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    color: #dfe7ef;
    background-color: transparent;
    text-decoration:none;
}

.side-btn:focus {
    outline: none;
}

.side-btn.active {
    position: relative;
    background-color: #6713d2;
    color: #dfe7ef;
    font-weight: 600;
    margin-left: 10px;
    border-radius: 30px 0 0 30px;
    text-decoration:none;
}

.side-btn.active::before {
    top: -30px;
}


.side-btn.active::after {
    bottom: -30px;
}

.side-btn.active::before, .side-btn.active::after {
    position: absolute;
    content: "";
    right: 0;
    height: 30px;
    width: 30px;
    background-color: #6713d2;
}

.side-btn.active .link-container::before {
    top: -60px;
}

.side-btn.active .link-container::after {
    bottom: -60px;
    z-index: 99;
}


.side-btn.active .link-container::before, .side-btn.active .link-container::after {
    position: absolute;
    content: "";
    right: 0px;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: #202020;
}
.link-container
{
    transition: all 0.5s ease;
    font-size: 1em;
}

.link-container:hover
{
    color: #cc208e;
    text-decoration:none;
}
</style>