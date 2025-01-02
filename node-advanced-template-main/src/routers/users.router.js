import express from 'express'; // express 모듈 가져오기
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js'; // requireAccessToken 가져오기
import { HTTP_STATUS } from '../constants/http-status.constant.js'; // HTTP_STATUS 가져오기
import { MESSAGES } from '../constants/message.constant.js'; // MESSAGES 가져오기

const usersRouter = express.Router(); // express.Router() 함수를 사용하여 객체를 생성

usersRouter.get('/me', requireAccessToken, (req, res, next) => { // 유저 정보 조회 라우터
  try {
    const data = req.user; // 요청 본문에서 사용자 정보 서버로 전달

    return res.status(HTTP_STATUS.OK).json({ // 200 상태 코드와 메시지 변환
      status: HTTP_STATUS.OK, // 200 상태 코드
      message: MESSAGES.USERS.READ_ME.SUCCEED, // 유저 정보 조회 성공 메시지 변환
      data, // 사용자 정보
    });
  } catch (error) {
    next(error);
  }
});

export { usersRouter }; // usersRouter 내보내기