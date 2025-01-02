import Joi from 'joi'; // 유효성 검사 라이브러리
import { MESSAGES } from '../../constants/message.constant.js'; // 메시지 상수
import { MIN_RESUME_LENGTH } from '../../constants/resume.constant.js'; // 최소의 텍스트 예를 들어 사용자가 100줄을 쓰게 된다면 안되고 150줄 이상이야 함.

const schema = Joi.object({ // 이력서 생성 스키마 유효성 검사
  title: Joi.string().required().messages({ // 제목 유효성 검사
    'any.required': MESSAGES.RESUMES.COMMON.TITLE.REQUIRED, // 제목 필드가 누락된 경우의 에러 메시지 
  }),
  content: Joi.string().min(MIN_RESUME_LENGTH).required().messages({ // 내용 유효성 검사
    'any.required': MESSAGES.RESUMES.COMMON.CONTENT.REQUIRED, // 내용 필드가 누락된 경우의 에러 메시지
    'string.min': MESSAGES.RESUMES.COMMON.CONTENT.MIN_LENGTH, // 최소 길이 미만일 경우의 에러 메시지
  }),
});

export const createResumeValidator = async (req, res, next) => { // 위의 내용들이 담긴 미들웨어 함수 ( 이력서 생성 유효성 검사 )
  try {
    await schema.validateAsync(req.body); // 유효성 검사 실행
    next(); // 다음 미들웨어로 이동
  } catch (error) {
    next(error); // 에러 처리
  }
};
