<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Publish your new Song</h3>
        <div class="Music-Container">
          <form @submit.prevent="onSubmit" enctype="multipart/form-data">
                <div class="form-group">
                  <label>Name the song</label>
                  <input type="text" class="form-control"  placeholder="Name" v-model="name" required>
                </div>
                
                <div class="form-group">
                  <label>Artist</label>
                  <input type="text" class="form-control" :placeholder="`${userId.username}`" v-model="artist" required>
                </div>

                <div class="form-group">
                    <label>Description of the song</label>
                    <textarea class="form-control" placeholder="Description" v-model="description" required></textarea>
                </div>

                <div class="form-group">
                    <label>Clip_Url</label>
                    <input type="text" class="form-control" placeholder="source" v-model="url" required>
                </div>
                <div class="userType">
                  choose a type of publication for your music 
                  <input type="radio" name="typePub" value="link" id="link" @click="link">
                  <label for="link">link</label>
                  <input type="radio" name="typePub" value="upload" id="upload" @click="upload">
                  <label for="upload">upload</label>
                    <div v-if="selected">                    
                    <div class="fields">
                      <input type="file" ref="file" id="file" @change="onSelectCover" accept="image/*"/>
                      <label for="file" class="upload-box" > 
                      <font-awesome-icon  icon="plus-circle"/>
                      {{ inputCover }}</label>

                      <input type="file" ref="file2" id="fileMusic" @change="onSelectSource" accept="audio/mp3,audio/mp4"/>
                      <label for="fileMusic" class="upload-box" > 
                      <font-awesome-icon  icon="plus-circle"/>
                      {{ inputSource }}
                      </label>
                    </div>
                  </div>
                  <div v-else>
                    <div class="form-group">
                        <label>Cover_Music</label>
                        <input type="text" class="form-control" placeholder="cover" v-model="cover" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Source_Music</label>
                        <input type="text" class="form-control" placeholder="source" v-model="source" required>
                    </div>                 
                  </div>
                </div>
                <h5> {{ message }} </h5>
              <button>Submit</button>
          </form>
        {{ content }}
        </div>
    </header>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import MusicService from "../services/music.service";
export default {
  name: "Admin",
  data() {
    return {
      content: "",
      name: '',
      description: '',
      userId: [],
      source: '',
      cover: '',
      url: '',
      artist: '',
      fileCover:"",
      fileSource:"",
      message:"",
      inputCover:"Upload the cover of the music",
      inputSource:"Upload the source of the music {mp3 || mp4}",
      selected: true,
      update: this.$route.query.toUpdate,
    };
  },
  mounted() {
    UserService.getAdminBoard().then(
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
  },
  methods: 
  {
    link(){
      if (this.selected === true)
      {
        this.selected = false;
      }
    },
    upload()
    {
      if (this.selected === false)
      {
        this.selected = true;
      }
    },
    onSelectCover(){
      this.inputCover = this.$refs.file.files[0].name; 
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      this.fileCover = this.$refs.file.files[0];
      if (!allowedTypes.includes(this.fileCover.type)){ 
        this.message = "Only images are required !!!"
      }
      /*
      if(this.fileCover.size> 500000)
      {
        this.message = "Too large, max size allowed is 500KB"
      }
      */
    },
    onSelectSource(){
      /* 
        The most remarkable difference between these two players is in their 
        functions. Indeed, an MP3 player only allows the playback of audio files, 
        while an MP4 player allows the playback of audio, video, text and other files. 
        Similarly, the compression in MP3 reduces the file size, but also the sound quality, 
        while the file quality in MP4 is high. Added to this, the highest bit rate 
        is 320 kbps for MP3 and 2 Mbps for MP4. This is a very big difference. 
        In addition, MP3 files are usually obtained by compressing the content of CDs. 
        As for MP4, it is used for files intended for the Internet or for streaming 
        applications. Finally, at the level of Apple, the MP4 file is the alternative 
        to MP3.
      */
      this.inputSource = this.$refs.file2.files[0].name;
      const allowedTypes = ["audio/mp3", "audio/mp4","audio/mpeg"];
      this.fileSource = this.$refs.file2.files[0];
      //console.log(this.fileSource.type)
      if (!allowedTypes.includes(this.fileSource.type)){ 
        this.message = "Only audio are required !!!"
      }
      /*
      if(this.fileSource.size> 500000)
      {
        this.message = "Too large"
      }
      */
    },
    async onSubmit()
    {
      if(this.selected === true && this.update === undefined)
      {
        console.log("The Front is using Create Music Dynamic")
        const formData = new FormData();
        formData.append('file',this.fileCover);
        formData.append('name',this.name);
        formData.append('description',this.description);
        formData.append('artist',this.artist);
        formData.append('userId',this.userId.id);
        formData.append('source',this.fileSource);
        formData.append('url',this.url);
        formData.append('favorited',false);
        formData.append('numberLikes' , 0)
        formData.append('numberStreams', 0)
        MusicService.createMusicDynamic(formData).then(
        (response) => {
          this.content = response.data;
          this.$router.push("/dashboard/user");
        },
        (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        });
      } else if (this.selected === false && this.update === undefined){
        console.log("The Front is using Create Music")
        const music = {
          'name' : this.name,
          'description': this.description,
          'artist': this.artist,
          'userId': this.userId.id,
          'source': this.source,
          'cover' : this.cover,
          'url': this.url,
          'favorited': false,
         'numberLikes' : 0,
          'numberStreams': 0,
        }
        MusicService.createMusic(music).then(
        (response) => {
          this.content = response.data;
          this.$router.push("/dashboard/user");
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
      } 
      else if(this.selected === true && this.update !== undefined)
        {
          console.log("The Front is using Update Music Dynamic")
        const formData = new FormData();
        formData.append('file',this.fileCover);
        formData.append('name',this.name);
        formData.append('description',this.description);
        formData.append('artist',this.artist);
        formData.append('userId',this.userId.id);
        formData.append('source',this.fileSource);
        formData.append('url',this.url);
        formData.append('id',this.update);
        formData.append('favorited',false);
        formData.append('numberLikes' , 0)
        formData.append('numberStreams', 0)
        MusicService.updateOneMusicDynamic(formData,this.update).then(
        (response) => {
          this.content = response.data;
          console.log(response.data)
          this.$router.push("/dashboard/user");
        },
        (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        });
      } else if (this.selected === false && this.update !== undefined)
      {
        console.log("The Front is using Update Music ")
        const music = {
          'name' : this.name,
          'description': this.description,
          'artist': this.artist,
          'userId': this.userId.id,
          'source': this.source,
          'cover' : this.cover,
          'url': this.url,
          'favorited': false,
         'numberLikes' : 0,
          'numberStreams': 0,
        }
        MusicService.updateOneMusic(music, this.update).then(
        (response) => {
          this.content = response.data;
          this.$router.push("/dashboard/user");
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
      }
    }
  },
  created() 
  {
    this.userId =  this.$store.state.auth.user;
    //console.log("music to update is → " + this.update)
    //console.log( this.update === undefined)

    if(this.update !== undefined)
    {
      MusicService.getOneMusic(this.update).then(
        (response) => {
          this.content = response.data;
          this.name = response.data.name;
          this.description = response.data.description;
          this.source = response.data.source.split('/musics/')[1];
          this.cover = response.data.cover.split('/images/')[1];
          this.url = response.data.url;
          this.artist = response.data.artist;
          //this.inputCover = response.data.cover.split('/images/')[1];
          //this.inputSource = response.data.source.split('/musics/')[1];
          const filename = response.data.cover.split('/images/')[0];
          if(filename === "http://localhost:3000")
          {
            this.selected = true;
          } else {
            this.selected = false;
            this.source = response.data.source.split('/musics/')[0];
            this.cover = response.data.cover.split('/images/')[0];
          }    
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
    } 

  },
}
</script>

<style scoped>
.jumbotron
{
  margin : 15px 15px 15px 15px;
}

.fields
{
  display : flex;
  text-align:center;
  flex-direction:column;
  justify-content:center;
  align-items:center;
}

input[type="file"]
{
  display : none;
}

.upload-box
{
  font-size : 16px;
  background-image: linear-gradient(to left, #cc208e 0%, #6713d2 100%);                
  border-radius : 50px;
  box-shadow : 0px 0px 10px  #cc208e;
  width : 350px;
  outline: none; 
  color:white;
  cursor: pointer;


}



</style>

