import Joi from 'joi'; // 유효성 검사 라이브러리에서 가져옴
import { MESSAGES } from '../../constants/message.constant.js'; // 메시지 상수

const schema = Joi.object({ // 로그인 스키마 유효성 검사
  email: Joi.string().email().required().messages({ // 이메일 유효성 검사
    'any.required': MESSAGES.AUTH.COMMON.EMAIL.REQUIRED, // 이메일 필드가 누락된 경우 에러 메시지
    'string.email': MESSAGES.AUTH.COMMON.EMAIL.INVALID_FORMAT, // 이메일 형식이 잘 못된 경우 에러 메시지
  }),
  password: Joi.string().required().messages({ // 비밀번호 유효성 검사
    'any.required': MESSAGES.AUTH.COMMON.PASSWORD.REQURIED, // 비밀번호 필드가 누락된 경우 에러 메시지
  }),
});

export const signInValidator = async (req, res, next) => { // 위의 내용들이 담긴 미들웨어 함수 ( 로그인 유효성 검사 )
  try { // 아래 내용들이 문제가 생기면 바로 catch 문으로 이동
    await schema.validateAsync(req.body); // 유효성 검사 실행
    next(); // 다음 미들웨어로 이동
  } catch (error) { // try 문에서 생기면 바로 catch 문으로 이동
    next(error);// 에러 처리
  }
};
