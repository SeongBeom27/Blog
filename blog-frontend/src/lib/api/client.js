import axios from 'axios';

const client = axios.create();

/*
-> axios 인스턴스를 만들면 나중에 API 클라이언트 설정에 공통 설정을 쉽게 넣고 교체할 수 있다.
// API 주소를 다른 곳으로 사용함
client.defaults.baseURL = 'https://external-api-server.com';

// header setting
client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';

// interceptor setting
client.interceptors.response.use(
  (response) => {
    // 요청 성공 시 특정 작업 수행
    return response;
  },
  (error) => {
    // 요청 실패 시 특정 작업 수행
    return Promise.reject(error);
  },
);

*/

export default client;
