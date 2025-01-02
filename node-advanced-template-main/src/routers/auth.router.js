import express from 'express'; // express 라이브러리
import bcrypt from 'bcrypt'; // bcrypt 라이브러리
import jwt from 'jsonwebtoken'; // jsonwebtoken 라이브러리
import { HTTP_STATUS } from '../constants/http-status.constant.js'; // '../constants/http-status.constant.js' 에서 상태 코드 상수를 가져옴
import { MESSAGES } from '../constants/message.constant.js'; // '../constants/message.constant.js' 에서 메시지 상수를 가져옴
import { signUpValidator } from '../middlewares/validators/sign-up-validator.middleware.js'; // '../middlewares/validators/sign-up-validator.middleware.js' 에서 회원가입 검증 미들웨어를 가져옴
import { signInValidator } from '../middlewares/validators/sign-in-validator.middleware.js'; // '../middlewares/validators/sign-in-validator.middleware.js' 에서 로그인 검증 미들웨어를 가져옴
import { prisma } from '../utils/prisma.util.js'; // '../utils/prisma.util.js' 에서 prisma 클라이언트를 가져옴
import {
  ACCESS_TOKEN_EXPIRES_IN,
  HASH_SALT_ROUNDS,
} from '../constants/auth.constant.js'; // '../constants/auth.constant.js' 에서 인증 상수를 가져옴
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js'; // '../constants/env.constant.js' 에서 액세스 토큰 시크릿 상수를 가져옴

const authRouter = express.Router(); // express.Router() 함수를 사용하여 객체를 생성

authRouter.post('/sign-up', signUpValidator, async (req, res, next) => { // 회원가입 라우터
  try {
    const { email, password, name } = req.body; // 요청 본문에서 이메일, 비밀번호, 이름 추출

    const existedUser = await prisma.user.findUnique({ where: { email } }); // 이메일 중복되는 지 조회

    // 이메일이 중복된 경우
    if (existedUser) {
      return res.status(HTTP_STATUS.CONFLICT).json({ // 에러코드 409와 함께 에러 메시지 변환
        status: HTTP_STATUS.CONFLICT, // 409 상태 코드
        message: MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED, // 이메일이 중복된 경우 에러 메시지 변환
      });
    }

    const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS); // 비밀번호 해싱

    const data = await prisma.user.create({ // 사용자 저장 할때 이메일, 비밀번호(해싱), 이름 저장
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    data.password = undefined; // 비밀번호 로그에 안남게 하기

    return res.status(HTTP_STATUS.CREATED).json({ // 201 상태 코드와 함께 메시지 변환
      status: HTTP_STATUS.CREATED, // 201 상태 코드
      message: MESSAGES.AUTH.SIGN_UP.SUCCEED, // 회원가입 성공 메시지 변환
      data, // 사용자 데이터
    });
  } catch (error) {
    next(error); // 오류 처리
  }
});

authRouter.post('/sign-in', signInValidator, async (req, res, next) => { // 로그인 라우터
  try {
    const { email, password } = req.body; // 요청 본문에서 이메일, 비밀번호 추출

    const user = await prisma.user.findUnique({ where: { email } }); // 가입되어 있는 사용자의 이메일 조회

    const isPasswordMatched = // 비밀번호 일치 하는지 확인
      user && bcrypt.compareSync(password, user.password); // 비밀번호 일치 하는지 확인

    if (!isPasswordMatched) { // 비밀번호가 일치 하지 않는 경우
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ // 에러코드 401과 함께 에러 메시지 변환
        status: HTTP_STATUS.UNAUTHORIZED, // 401 상태 코드
        message: MESSAGES.AUTH.COMMON.UNAUTHORIZED, // 비밀번호가 일치 하지 않는 경우 에러 메시지 변환
      });
    }

    const payload = { id: user.id }; // 페이로드 생성

    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { // 엑세스 토큰 생성
      expiresIn: ACCESS_TOKEN_EXPIRES_IN, // 엑세스 토큰 만료 시간
    });

    return res.status(HTTP_STATUS.OK).json({ // 200 상태 코드와 메시지 변환
      status: HTTP_STATUS.OK, // 200 상태 코드
      message: MESSAGES.AUTH.SIGN_IN.SUCCEED, // 로그인 성공 메시지 변환
      data: { accessToken }, // 액세스 토큰
    });
  } catch (error) {
    next(error); // 오류 처리
  }
});

export { authRouter }; // authRouter 내보내기
