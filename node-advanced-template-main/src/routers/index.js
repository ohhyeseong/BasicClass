import express from 'express'; // express 모듈 가져오기
import { authRouter } from './auth.router.js'; // authRouter 가져오기
import { usersRouter } from './users.router.js'; // usersRouter 가져오기
import { resumesRouter } from './resumes.router.js'; // resumesRouter 가져오기
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js'; // requireAccessToken 가져오기

const apiRouter = express.Router(); // apiRouter 생성

apiRouter.use('/auth', authRouter); // authRouter 사용
apiRouter.use('/users', usersRouter); // usersRouter 사용
apiRouter.use('/resumes', requireAccessToken, resumesRouter); // resumesRouter 사용

export { apiRouter }; // apiRouter 내보내기
