  <template>
    <article class="home">
      <router-link to='/login'>
        <div class="Logo">
          <img class="Logoimg" src="../assets/Musy_1.gif" alt="logo of Musy gif">
        </div>
      </router-link>
      <div class="welcome">
          <h1>
            <span class="typed-text">{{ typeValue }}</span>
            <span class="cursor" :class="{'typing': typeStatus}">&nbsp;</span>
          </h1>
      </div>  
    </article>
  </template>

  <script>
  import UserService from "../services/user.service";
  export default {
    name: "Home",
    data() {
      return {
        content: "",
        typeValue: '',
        typeStatus: false,
        typeArray: ['Hi ☻!', 'Welcome To Musy', 'With Musy You Will', 'Listen' , 'Publish', 'Search','Enjoy', 'All Music You Love ♥', 'Click On The Logo'],
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
    background: linear-gradient(45deg, #FC466B, #3F5EFB);
    height: 100vh;
    width: 100%;
    font-family: arial, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
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

  .welcome 
  {
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    text-align: center;
    flex-wrap: wrap;
    outline: none;
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