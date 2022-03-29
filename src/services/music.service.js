import axios from 'axios';
import authHeader from './auth-header';
// (music service)

const API_URL = 'https://musy.netlify.app/api/music/';

class MusicService {
  createMusicDynamic(music) {
    return axios.post(API_URL + 'upload', music , { headers: authHeader()})
  }

  createMusic(music) {
    return axios.post(API_URL, music , { headers: authHeader()})
  }

  updateOneMusic(music,id) {
    return axios.put(API_URL + id, music,{ headers: authHeader() });
  }
  
  updateOneMusicDynamic(music,id) {
    return axios.put(API_URL + 'upload/' + id, music,{ headers: authHeader() });
  }

  getAllmusic() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getOneMusic(id) {
    return axios.get(API_URL + id , { headers: authHeader() });
  }

  deleteOneMusic(id) {
    return axios.delete(API_URL + id, { headers: authHeader() })
  }

  deleteOneMusicDynamic(id) {
    return axios.delete(API_URL + 'upload/' + id , { headers: authHeader()})
  }
}

export default new MusicService();
