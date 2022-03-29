<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
      
      <div class="searchOptions">
        <div class="search">
          <div class="icon" @click="search"></div>

          <div class="inputSearch">
            <input type="text" :placeholder="`Search On ${mine}`" id="mysearch" v-model="toSearch" @change="findOne">
          </div>

          <span class="clear" @click="clear"><font-awesome-icon icon="trash"/></span>
        </div>
        <button class="search-mine-btn" @click="searchMineBtn"><font-awesome-icon icon="search"/> Only My Songs</button>
      </div>
    <h5> {{ message }} </h5>
    </header>

    <div class="music-container">
      <ul class="music-display">
       <li class="music-li" v-for="(track, index) in trackstoDisplay" :key="index" v-show="!found">
          <div class="music-cover" >
            <transition-group>
                <div class="music-cover__item" :style="{ backgroundImage: `url(${track.cover})` }" :key="index"></div>
            </transition-group>                
          </div>        
          <div class="music-details" :title="track.name" >
            <li class="name_music">name : {{ track.name }}</li>
            <li class="artist_music">artist : {{ track.artist }}</li>
            <li class="description_music">description : {{ track.description }}</li>            
            <li class="stream_music">number of stream : {{track.numberStreams}}</li>
            <li class="stream_music">number of likes ♥ : {{track.numberStreams}}</li>
          </div>

          <router-link :to="{ 
            path: '/dashboard/playlists', 
            query: { toplay: this.toPlay }}" 
            active-class="active" tag="button" exact>
              <div class="play-btn" @click="toPlay = track._id">
              <font-awesome-icon icon="play"/>
              Play</div>
          </router-link>
          
          <div class="play-btn" @click="remove(track)" v-show="this.$store.state.auth.user.id === track.userId"><font-awesome-icon icon="trash"/> Delete</div>
          
          <router-link :to="{ 
            path: '/dashboard/admin', 
            query: { toUpdate: track._id }}" 
            active-class="active" tag="button" exact>  
            <div class="play-btn"  v-show="this.$store.state.auth.user.id === track.userId"><font-awesome-icon icon="bars-staggered"/> Update</div>
          </router-link>
        </li>
        <li class="music-li" v-for="(track, index) in tracksSearched" :key="index" v-show="found">
          <div class="music-cover" >
            <transition-group>
                <div class="music-cover__item" :style="{ backgroundImage: `url(${track.cover})` }" :key="index"></div>
            </transition-group>                
          </div>        
          <div class="music-details" :title="track.name" >
            <li class="name_music">name : {{ track.name }}</li>
            <li class="artist_music">artist : {{ track.artist }}</li>
            <li class="description_music">description : {{ track.description }}</li>            
            <li class="stream_music">number of stream : {{track.numberStreams}}</li>
            <li class="stream_music">number of likes ♥ : {{track.numberStreams}}</li>
          </div>

          <router-link :to="{ 
            path: '/dashboard/playlists', 
            query: { toplay: this.toPlay }}" 
            active-class="active" tag="button" exact>
              <div class="play-btn" @click="toPlay = track._id">
              <font-awesome-icon icon="play"/>
              Play</div>
          </router-link>
          
          <div class="play-btn" @click="remove(track)" v-show="this.$store.state.auth.user.id === track.userId"><font-awesome-icon icon="trash"/> Delete</div>
          
          <router-link :to="{ 
            path: '/dashboard/admin', 
            query: { toUpdate: track._id }}" 
            active-class="active" tag="button" exact>  
            <div class="play-btn"  v-show="this.$store.state.auth.user.id === track.userId"><font-awesome-icon icon="bars-staggered"/> Update</div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import MusicService from "../services/music.service";

export default {
  name: "User",
  data() {
    return {
      content: "",
      toSearch : "",
      tracks :[],
      trackstoDisplay:[],
      tracksSearched:[],
      toPlay:0,
      mine : "All The Songs",
      found: false,
      message: "",
    };
  },
  methods: 
  {
    findOne() {
    console.log("on recherche → " + this.toSearch);
    console.log("sur → " + this.mine);
    this.nbrFound = 0;
    if(this.toSearch === "")
    {
      this.tracksSearched = this.trackstoDisplay
    }else {
      this.tracksSearched = []
    }

    if(this.mine === "All The Songs" && this.toSearch !== "")
    {
      console.log("The request is turning on all the songs tracks")
      for (let i = 0; i < this.tracks.length; i++) 
      {
        if(
          this.tracks[i].name.indexOf(this.toSearch) !== -1 ||
          this.tracks[i].artist.indexOf(this.toSearch) !== -1 ||
          this.tracks[i].description.indexOf(this.toSearch) !== -1
          )
        {
          this.nbrFound  = this.nbrFound + 1;
          this.message = "we found" + this.nbrFound;
          this.found = true;
          this.tracksSearched.push(this.tracks[i]); 
        } else
        {
          this.found = false;
          this.message = "we found Nothing";
        } 
      }  
    } else if(this.mine === "Only My Songs" && this.toSearch !== "") 
    {
      console.log("The request is turning on Only my songs tracks")
      for (let i = 0; i < this.trackstoDisplay.length; i++) 
      {
        if(
          this.tracks[i].name.indexOf(this.toSearch) !== -1 ||
          this.tracks[i].artist.indexOf(this.toSearch) !== -1 ||
          this.tracks[i].description.indexOf(this.toSearch) !== -1
        )
        {
          this.nbrFound  = this.nbrFound + 1;
          this.message = "we found" + this.nbrFound;
          this.found = true;
          this.tracksSearched.push(this.trackstoDisplay[i]); 
        } else
        {
          this.found = false;
          this.message = "we found Nothing" 
        } 
      }  
    }
    },
    search()
    {
      //const icon = document.querySelector('.icon');
      const search = document.querySelector('.search');
      search.classList.toggle('active');
    }, 
    clear()
    {
      this.toSearch = "";
    },
    searchMineBtn()
    {
      const searchMineBtn = document.querySelector('.search-mine-btn');
      searchMineBtn.classList.toggle('active');
      this.toSearch = ""
      if(this.mine === "All The Songs")
      {
        this.mine = "Only My Songs";
        this.trackstoDisplay = []
        for (let i = 0; i < this.tracks.length; i++) 
        {
          if(this.$store.state.auth.user.id === this.tracks[i].userId)
          {
            this.trackstoDisplay.push(this.tracks[i])
          }
        }
      } else 
      { 
        this.mine = "All The Songs"
        this.trackstoDisplay = this.tracks
      }
    },
    getAll()
    {
      MusicService.getAllmusic().then(
      response => {
      console.log(response.data)
      this.tracks = response.data
      this.trackstoDisplay = this.tracks
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      })
    },
    remove(track){
      const filename = track.cover.split('/images/')[0];
      if(filename === "http://localhost:3000")
      {
        MusicService.deleteOneMusicDynamic(track._id)
        .then(
          response => {
            console.log(response)
            MusicService.getAllmusic().then(
            response => {
              console.log(response.data)
              this.tracks = response.data
              this.trackstoDisplay = this.tracks
            },
            (error) => {
              this.content =
               (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
              })
            },
          (error) => {
            this.content =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
          })
        } else {
        MusicService.deleteOneMusic(track._id).then(
        response => {
          console.log(response)
          MusicService.getAllmusic().then(
          response => {
          console.log(response.data)
          this.tracks = response.data
          this.trackstoDisplay = this.tracks
          },
          (error) => {
          this.content =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
        })
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      })
      }
    }
  },
  created() {
    UserService.getUserBoard().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
    MusicService.getAllmusic().then(
      response => {
      // console.log(response.data)
      this.tracks = response.data
      this.trackstoDisplay = this.tracks
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) || 
          error.message ||
          error.toString();
    });
  }, 
};
</script>

<style scoped>
.jumbotron
{
  margin : 15px 15px 15px 15px;
  padding: 15px 15px 15px 15px;
}
.searchOptions
{
  display: flex;
  justify-content: flex-start;
  align-items: space-between;
  text-align: center;
}


.search-mine-btn {
  position : relative;
  margin-left: 10px;
  height : 60px;
  text-decoration: none;
  border:none;
  padding: 7px 7px;
  border-radius: 15px;
  box-shadow: 0px 2px 10px -6px rgba(36, 52, 70, 0.65);
  background: #fff;
  color: lightgrey;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 16px;
  transition: all 0.2s ease-in-out;
}


.search-mine-btn.active
{
  box-shadow: 0px 4px 30px -6px rgba(36, 52, 70, 0.65);               
  transform: scale(1);
  background: #24292e;
  color: #5CE1E6;                
}

@media screen and (min-width: 500px) {
  .search-mine-btn:hover {
    transform: scale(1.1);
    box-shadow: 0px 17px 20px -6px rgba(36, 52, 70, 0.36);
  }
}
@media screen and (max-width: 700px) {
  .search-mine-btn {
    position: relative;
    bottom: auto;
    right: auto;
    margin-top: 20px;
  }
  .search-mine-btn:active {
    transform: scale(1.1);
    box-shadow: 0px 17px 20px -6px rgba(36, 52, 70, 0.36);
  }
}


.search
{
  position : relative;
  width : 60px;
  height : 60px;
  background: #fff;
  border-radius : 15px;
  transition: 0.5s;
  box-shadow: 0px 2px 15px -6px rgba(36, 52, 70, 0.65);
  overflow: hidden;
}
.search:hover {
  transform: scale(1);
  box-shadow: 0px 17px 20px -6px rgba(36, 52, 70, 0.36);
}
.search.active
{
 width : 330px;  
}

.search .icon
{
  position : absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
}

.search .icon::before
{
  content: '';
  position : absolute;
  width: 15px;
  height: 15px;
  border: 4px solid lightgrey;
  border-radius: 50%;
  transform: translate(-4px,-4px);
}
.search .icon::after
{
  content: '';
  position : absolute;
  width: 3px;
  height: 12px;
  background: lightgrey; 
  transform: translate(6px,6px) rotate(315deg);
}

.search .inputSearch 
{
  position: relative;
  width: 300px;
  height: 60px;
  left: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search .inputSearch input 
{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  border:none;
  outline: navajowhite;
  font-size: 18px;
  padding : 10px 0;
  caret-color: #cc208e;
}

.clear
{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  right: 15px;
  cursor: pointer;
  display:flex;
  justify-content: flex;
  align-items: center;

}


.music-container
{
  border: 3px solid rgba(255, 255, 255, .5);
  backdrop-filter: blur(100px);
  -webkit-backdrop-filter: blur(10px);
  -moz-backdrop-filter: blur(10px);
  box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, .2);
  padding: 5px 5px 5px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  background-size: cover;
}

*{
  box-sizing: border-box;
}

.music-display
{
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  color: rgb(167, 167, 167);
}

@media screen and (max-width: 700px), (max-height: 500px) {
  .music-display {
    flex-wrap: wrap;
    flex-direction: column;
  }
}

.music-li
{
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background: #eef3f7;
  width: 200px;
  min-height: 400px;
  box-shadow: 0px 15px 35px -5px rgba(50, 88, 130, 0.32);
  border-radius: 15px;
  margin: 30px 30px 30px 30px;  
}

@media screen and (max-width: 576px), (max-height: 500px) {
  .music-li {
    padding: 20px;
    width: 250px;
    margin-top: 75px;
    min-height: initial;
    padding-bottom: 30px;
  }
}

.music-cover
{
  width: 200px;
  height: 200px;
  margin-left: -70px;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
  border-radius: 15px;
  z-index: 1;
}

@media screen and (max-width: 600px), (max-height: 500px) {
  .music-cover {
    margin-top: -70px;
    margin-bottom: 25px;
    width: 200px;
    height: 200px;
    margin-left: auto;
    margin-right: auto;
  }
}

.music-cover__item {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  position: absolute;
  left: 0;
  top: 0;
  transition: all 1s ease;
}

.music-cover__item:before {
  content: "";
  background: inherit;
  width: 100%;
  height: 100%;
  box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
  display: block;
  z-index: 1;
  position: absolute;
  top: 30px;
  transform: scale(0.9);
  filter: blur(10px);
  opacity: 0.9;
  border-radius: 15px;
}
.music-cover__item:after {
  content: "";
  background: inherit;
  width: 100%;
  height: 100%;
  box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
  display: block;
  z-index: 2;
  position: absolute;
  border-radius: 15px;
}
.music-cover__item:hover
{
  transform: translateY(-7%);
}

.music-details
{
  flex-direction:row;
  align-items: center;
  justify-content: center;
  font-size: 1.1em;
  font-weight: bold;
}

.play-btn {
  text-decoration: none;
  padding: 15px 25px;
  border-radius: 4px;
  box-shadow: 0px 4px 30px -6px rgba(36, 52, 70, 0.65);
  background: #24292e;
  color: #fff;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
}
@media screen and (min-width: 500px) {
  .play-btn:hover {
    transform: scale(1.1);
    box-shadow: 0px 17px 20px -6px rgba(36, 52, 70, 0.36);
  }
}
@media screen and (max-width: 700px) {
  .play-btn {
    position: relative;
    bottom: auto;
    right: auto;
    margin-top: 20px;
  }
  .play-btn:active {
    transform: scale(1.1);
    box-shadow: 0px 17px 20px -6px rgba(36, 52, 70, 0.36);
  }
}
</style>
