import axios from 'axios';

const AppRequest = axios.create({
  baseURL: 'https://appstore.suyuncash.com',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryQ43AvXpvFqlHXkix'
  },
  transformRequest: [function (data) {
    var formData = new FormData();
    for (let key in data) {
      formData.set(key, data[key]);
    }
    return formData;
  }],
})
export const onRequest = data => AppRequest.post('/uploadMobileApp',data);