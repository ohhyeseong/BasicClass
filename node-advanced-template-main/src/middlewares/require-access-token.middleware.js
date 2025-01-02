import jwt from 'jsonwebtoken'; // jsonwebtoken 라이브러리
import { HTTP_STATUS } from '../constants/http-status.constant.js'; // '../constants/http-status.constant.js' 에서 상태 코드 상수를 가져옴
import { MESSAGES } from '../constants/message.constant.js'; // '../constants/message.constant.js' 에서 메시지 상수를 가져옴
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js'; // '../constants/env.constant.js' 에서 액세스 토큰 시크릿 상수를 가져옴
import { prisma } from '../utils/prisma.util.js'; // '../utils/prisma.util.js' 에서 prisma 클라이언트를 가져옴

export const requireAccessToken = async (req, res, next) => { // 액세스 토큰 필요 미들웨어
  try {
    // 인증 정보 파싱
    const authorization = req.headers.authorization; // 인증 정보 파싱

    // Authorization이 없는 경우
    if (!authorization) { // 만약에 인증 정보가 없다면
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ // 401 상태 코드와 함께 에러 메시지 변환
        status: HTTP_STATUS.UNAUTHORIZED, // 401 상태 코드
        message: MESSAGES.AUTH.COMMON.JWT.NO_TOKEN, // 인증 정보가 없을 경우 에러 메시지
      });
    }

    // JWT 표준 인증 형태와 일치하지 않는 경우
    const [type, accessToken] = authorization.split(' '); // 인증 정보 파싱

    if (type !== 'Bearer') { // 만약에 인증 정보가 Bearer 형태가 아니라면
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ // 401 상태 코드와 함께 에러 메시지 변환
        status: HTTP_STATUS.UNAUTHORIZED, // 401 상태 코드
        message: MESSAGES.AUTH.COMMON.JWT.NOT_SUPPORTED_TYPE, // 인증 정보가 Berarer 형태가 아닌 경우 에러 메시지 변환
      });
    }

    // AccessToken이 없는 경우
    if (!accessToken) { // 만약에 액세스 토큰이 없다면?
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ // 401 상태 코드와 함께 에러 메시지 변환
        status: HTTP_STATUS.UNAUTHORIZED, // 401 상태 코드
        message: MESSAGES.AUTH.COMMON.JWT.NO_TOKEN, // 인증 정보가 없을 경우 에러 메시지 변환
      });
    }

    let payload; // payLoad 변수 선언
    try {
      payload = jwt.verify(accessToken, ACCESS_TOKEN_SECRET); // payload 변수에 액세스 토큰 검증
    } catch (error) {
      // AccessToken의 유효기한이 지난 경우
      if (error.name === 'TokenExpiredError') { // 만약에 엑세스 토큰의 유효기간이 지났다면?
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ // 401 상태 코드와 함께 에러 메시지 변환
          status: HTTP_STATUS.UNAUTHORIZED, // 401 상태 코드
          message: MESSAGES.AUTH.COMMON.JWT.EXPIRED, // 엑세스 토큰의 유효기간이 지났을 경우 에러 메시지 변환
        });
      }
      // 그 밖의 AccessToken 검증에 실패한 경우
      else {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ // 401 상태 코드와 함께 에러 메시지 변환
          status: HTTP_STATUS.UNAUTHORIZED, // 401 상태 코드
          message: MESSAGES.AUTH.COMMON.JWT.INVALID, // 액세스 토큰 검증에 실패했을 경우 에러 메시지 변환
        });
      }
    }

    // Payload에 담긴 사용자 ID와 일치하는 사용자가 없는 경우
    const { id } = payload; // payload 변수에 담긴 사용자 ID 추출 
    const user = await prisma.user.findUnique({ // 사용자 조회
      where: { id }, // 사용자 ID로 조회
      omit: { password: true }, // 비밀번호 제외
    });

    if (!user) { // 만약 유저가 없다면?
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ // 401 상태 코드와 함께 에러 메시지 변환
        status: HTTP_STATUS.UNAUTHORIZED, // 401 상태 코드
        message: MESSAGES.AUTH.COMMON.JWT.NO_USER, // 사용자가 없을경우 에러 메시지 변환
      });
    }

    req.user = user; // 요청 객체에 사용자 정보 추가
    next(); // 다음 미들웨어로 이동
  } catch (error) {
    next(error); // 오류 처리
  }
};
