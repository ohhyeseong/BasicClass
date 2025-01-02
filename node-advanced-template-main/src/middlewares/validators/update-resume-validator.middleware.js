import Joi from 'joi';// 유효성 검사 라이브러리에서 가져옴
import { MESSAGES } from '../../constants/message.constant.js'; //메세지 상수
import { MIN_RESUME_LENGTH } from '../../constants/resume.constant.js'; // 최소의 텍스트 150줄 이상이여야 함

const schema = Joi.object({ // 이력서 업데이트 스키마 유효성 검사
  title: Joi.string(), // 제목 유효성 검사.
  content: Joi.string().min(MIN_RESUME_LENGTH).messages({ // 내용 유효성 검사.
    'string.min': MESSAGES.RESUMES.COMMON.CONTENT.MIN_LENGTH, // 최소 길이 미만일 경우 에러 메시지
  }),
})
  .min(1) // 최소 1개의 필드가 있어야 함.
  .messages({
    'object.min': MESSAGES.RESUMES.UPDATE.NO_BODY_DATA, // 본문이 없을 경우 에러 메시지
  });

export const updateResumeValidator = async (req, res, next) => { // 위의 내용들이 담긴 미들웨어 함수 ( 이력서 업데이트 유효성 검사)
  try {
    await schema.validateAsync(req.body); // 유효성 검사 실행
    next(); // 다음 미들웨어로 이동
  } catch (error) {
    next(error); // 에러 처리
  }
};
