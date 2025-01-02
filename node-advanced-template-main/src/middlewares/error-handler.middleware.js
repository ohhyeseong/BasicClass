import { HTTP_STATUS } from '../constants/http-status.constant.js'; // '../constants/http-status.constant.js' 에서 상태 코드 상수를 가져옴

export const errorHandler = (err, req, res, next) => { // 에러 처리 미들웨어
  console.error(err); // 에러 출력

  // joi에서 발생한 에러 처리
  if (err.name === 'ValidationError') { // joi 에서 발생한 에러인 경우
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ // 400 상태 코드와 함께 에러 메시지 변환
      status: HTTP_STATUS.BAD_REQUEST, // 400 상태 코드
      message: err.message, // 에러 메시지
    });
  }

  // 그 밖의 예상치 못한 에러 처리
  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ // 500 상태 코드와 함께 에러 메시지 변환
    status: HTTP_STATUS.INTERNAL_SERVER_ERROR, // 500 상태 코드
    message: '예상치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요.', // 에러 메시지
  });
};
