import express from 'express'; // express 모듈 가져오기
import { SERVER_PORT } from './constants/env.constant.js'; // SERVER_PORT 가져오기
import { errorHandler } from './middlewares/error-handler.middleware.js'; // errorHandler 가져오기
import { HTTP_STATUS } from './constants/http-status.constant.js'; // HTTP_STATUS 가져오기
import { apiRouter } from './routers/index.js'; // apiRouter 가져오기

const app = express(); // app 생성

app.use(express.json()); // JSON 형식 파싱
app.use(express.urlencoded({ extended: true })); // URL 인코딩 파싱

app.get('/health-check', (req, res) => { // 상태 확인 라우터
  return res.status(HTTP_STATUS.OK).send(`I'm healthy.`); // 200 상태 코드와 함께 메시지 변환
});

app.use('/api', apiRouter); // apiRouter 사용

app.use(errorHandler); // 오류 처리

app.listen(SERVER_PORT, () => { // 서버 실행
  console.log(`서버가 ${SERVER_PORT}번 포트에서 실행 중입니다.`); // 서버 실행 메시지 출력
});
