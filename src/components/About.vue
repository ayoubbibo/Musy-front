<template>
    <div class="home">
        <div class="welcome">
            <h1>
            <span class="typed-text">{{ typeValue }}</span>
            <span class="cursor" :class="{'typing': typeStatus}">&nbsp;</span>
            </h1>
        </div>
        
        <div class="contacts">
            <div class="description">
                Musy is a web application, it was realized within the framework of the web project IG3 by HAKEMI Ayoub. 
                Musy is a digital service that offers music and provides its users with access to a multitude of titles
                and other content creators.
                The purpose of this platform is to propose to the artists, producers or musicians the possibility of 
                being able to share their audio contents with the various users of the application. 
                Also to guarantee an ease of use and a pleasant quality of service. 
            </div>
            <div class="socials">
                <a href="https://www.facebook.com/messi.bibo/"><img src="https://www.mairiedommartin.fr/wp-content/uploads/2021/04/78dbc9c84d0124b0b9f63b896b12b3f1.png" alt="Facebook" width="40" height="40"></a>
                <a href="https://www.instagram.com/ayoub_hk_"><img src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c521.png" alt="Instagram link" width="30" height="30"></a>
                <a href="https://www.polytech.umontpellier.fr/"><img src="https://pbs.twimg.com/profile_images/537614441357905920/0tCODUF_.jpeg" alt="Polytech web site" width="28" height="28"></a>
            </div>
            <div class="bottom">
                <span>&copy;  Musy | Created By Ayoub </span>
            </div>
        </div>
    </div>
</template>
<script>
import UserService from "../services/user.service";
export default {
  name: "About",
  data() {
    return {
      content: "",
      typeValue: '',
      typeStatus: false,
      typeArray: ['Hi ☻!', 'Welcome To Musy', 'With Musy You Will', 'Listen' , 'Publish', 'Search','Enjoy', 'All Music You Love ♥'],
      typingSpeed: 80,
      erasingSpeed: 80,
      newTextDelay: 2000,
      typeArrayIndex: 0,
      charIndex: 0
    };
  },
  mounted() {
    UserService.getPublicContent().then(
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
  methods: {
      typeText() {
        if(this.charIndex < this.typeArray[this.typeArrayIndex].length) {
          if(!this.typeStatus)
            this.typeStatus = true;
          this.typeValue += this.typeArray[this.typeArrayIndex].charAt(this.charIndex);
          this.charIndex += 1;
          setTimeout(this.typeText, this.typingSpeed);
        }
        else {
          this.typeStatus = false;
          setTimeout(this.eraseText, this.newTextDelay);
        }
      },
      eraseText() {
        if(this.charIndex > 0) {
          if(!this.typeStatus)
            this.typeStatus = true;
          this.typeValue = this.typeArray[this.typeArrayIndex].substring(0, this.charIndex - 1);
          this.charIndex -= 1;
          setTimeout(this.eraseText, this.erasingSpeed);
        }
        else {
          this.typeStatus = false;
          this.typeArrayIndex += 1;
          if(this.typeArrayIndex >= this.typeArray.length)
            this.typeArrayIndex = 0;
          setTimeout(this.typeText, this.typingSpeed + 1000);
        }
      }
    },
    created() {
      setTimeout(this.typeText, this.newTextDelay + 200);
    }
};
</script>

<style scoped>


.home
{
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items: center;
    height:100%;
    width:100%;
}

.welcome
{
    width:50%;
    height:30%;
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    text-align: center;
    flex-wrap: wrap;
    outline: none;
}


.contacts
{
    display:flex;
    justify-content:center;
    flex-direction:column;
    align-items:center;
    height: 450px;
    width: 100%;
}

.description
{
  width:300px;
  height: 400px;
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
  font-family:cursive;
}

h1 
{
  font-size: 3rem;
  font-weight: normal;
  outline: none;
}

span.typed-text 
{
  color:#202020;
  font-weight: bold;
  font-family: cursive;
}

span.cursor 
{
  display: inline-block;
  margin-left: 3px;
  width: 4px;
  background-color: #FC466B;
  animation: cursorBlink 1s infinite;
}

span.cursor.typing 
{
  animation: none;
}

@keyframes cursorBlink 
{
  49% { background-color: #fff;}
  50% { background-color: transparent; }
  99% { background-color: transparent; }
}


.Logo 
{
  border-radius: 15px;
  display:flex;
  flex-wrap: wrap;
  outline: none;
  margin: 30px 30px 30px 30px;
  width: 350px;
  height: 350px;
  cursor: pointer;
  
}
.Logoimg 
{  
  box-shadow: 20px 20px 20px -6px rgba(0, 0, 0, .35);
  width:100%;
  height:100%;
  border-radius: 15px;
  transition: all 0.5s linear;
}

.Logoimg:hover 
{
  transform: scale(1.1)
}
</style>