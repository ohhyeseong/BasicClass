import Joi from 'joi'; // 유효성 검사 라이브러리에서 가져옴
import { MESSAGES } from '../../constants/message.constant.js'; // 메시지 상수
import { MIN_PASSWORD_LENGTH } from '../../constants/auth.constant.js'; // 최소의 비밀번호 길이를 가져옴

const schema = Joi.object({ // 회원가입 스키마 유효성 검사
  email: Joi.string().email().required().messages({ // 이메일 유효성 검사
    'any.required': MESSAGES.AUTH.COMMON.EMAIL.REQUIRED, // 이메일 필드가 누락된 경우 에러 메시지
    'string.email': MESSAGES.AUTH.COMMON.EMAIL.INVALID_FORMAT, // 이메일 형식이 잘 못된 경우 에러 메시지
  }),
  password: Joi.string().required().min(MIN_PASSWORD_LENGTH).messages({ // 비밀번호 유효성 검사
    'any.required': MESSAGES.AUTH.COMMON.PASSWORD.REQURIED, // 비밀번호 필드가 누락된 경우 에러 메시지
    'string.min': MESSAGES.AUTH.COMMON.PASSWORD.MIN_LENGTH, // 최소 길이 미만일 경우 에러 메시지
  }),
  passwordConfirm: Joi.string().required().valid(Joi.ref('password')).messages({ // 비밀번호 확인 유효성 검사
    'any.required': MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.REQURIED, // 비밀번호 확인 필드가 누락된 경우 에러 메시지
    'any.only': MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.NOT_MACHTED_WITH_PASSWORD, // 비밀번호 확인 필드가 비밀번호하고 다를 경우 에러 메시지
  }),
  name: Joi.string().required().messages({ // 이름 유효성 검사 
    'any.required': MESSAGES.AUTH.COMMON.NAME.REQURIED, // 이름 필드가 누락된 경우 에러 메시지
  }),
});

export const signUpValidator = async (req, res, next) => { // 위의 내용들이 담긴 미들웨어 함수 ( 회원가입 유효성 가입 검사 ) 
  try {
    await schema.validateAsync(req.body); // 유효성 검사 실행
    next();
  } catch (error) {
    next(error);
  }
};
