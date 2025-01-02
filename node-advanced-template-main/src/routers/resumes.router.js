import express from 'express'; // express 모듈 가져오기
import { HTTP_STATUS } from '../constants/http-status.constant.js'; // HTTP_STATUS 가져오기
import { MESSAGES } from '../constants/message.constant.js'; // MESSAGES 가져오기
import { createResumeValidator } from '../middlewares/validators/create-resume-validator.middleware.js'; // createResumeValidator 가져오기
import { prisma } from '../utils/prisma.util.js'; // prisma 가져오기
import { updateResumeValidator } from '../middlewares/validators/update-resume-validator.middleware.js'; // updateResumeValidator 가져오기

const resumesRouter = express.Router(); // express.Router() 함수를 사용하여 객체를 생성

// 이력서 생성
resumesRouter.post('/', createResumeValidator, async (req, res, next) => { // 이력서 생성 라우터
  try {
    const user = req.user; // 요청 본문에서 사용자 정보 추출.
    const { title, content } = req.body; // 요청 본문에서 제목, 내용 추출.
    const authorId = user.id; // 사용자 아이디 추출.

    const data = await prisma.resume.create({ // 이력서 생성
      data: { // 이력서 생성 데이터
        authorId, // 사용자 아이디
        title, // 제목
        content, // 내용
      },
    });

    return res.status(HTTP_STATUS.CREATED).json({ // 201 상태 코드와 함께 메시지 변환
      status: HTTP_STATUS.CREATED, // 201 상태 코드
      message: MESSAGES.RESUMES.CREATE.SUCCEED, // 이력서 생성 성공 메시지 변환
      data, // 이력서 생성 데이터
    });
  } catch (error) {
    next(error); // 오류 처리
  }
});

// 이력서 목록 조회
resumesRouter.get('/', async (req, res, next) => { // 이력서 목록 조회 라우터
  try {
    const user = req.user; // 요청 본문에서 사용자 정보 추출
    const authorId = user.id; // 사용자 아이디 추출.

    let { sort } = req.query; // 요청 본문에서 정렬 조건 추출

    sort = sort?.toLowerCase(); // 정렬 조건 소문자로 변환

    if (sort !== 'desc' && sort !== 'asc') { // 만약에 정렬 조건이 desc 또는 asc가 아니라면
      sort = 'desc'; // 정렬 조건을 desc로 설정
    }

    let data = await prisma.resume.findMany({ // 이력서 목록 조회
      where: { authorId }, // 사용자 아이디로 조회
      orderBy: { // 정렬 조건
        createdAt: sort, // 생성 날짜로 정렬
      },
      include: { // 작성자 정보 포함
        author: true, // 작성자 정보 포함
      },
    });

    data = data.map((resume) => { // 이력서 목록 매핑
      return { // 이력서 목록 반환
        id: resume.id, // 이력서 아이디
        authorName: resume.author.name, // 작성자 이름
        title: resume.title, // 제목
        content: resume.content, // 내용
        status: resume.status, // 상태
        createdAt: resume.createdAt, // 생성 날짜
        updatedAt: resume.updatedAt, // 업데이트 날짜
      };
    });

    return res.status(HTTP_STATUS.OK).json({ // 200 상태 코드와 함께 메시지 변환
      status: HTTP_STATUS.OK, // 200 상태 코드
      message: MESSAGES.RESUMES.READ_LIST.SUCCEED, // 이력서 목록 조회 성공 메시지 변환
      data, // 이력서 목록
    });
  } catch (error) {
    next(error); // 오류 처리
  }
});

// 이력서 상세 조회
resumesRouter.get('/:id', async (req, res, next) => { // 이력서 상세 조회 라우터
  try {
    const user = req.user; // 유저의 정보 추출
    const authorId = user.id; // 유저의 아이디 추출

    const { id } = req.params; // 요청 본문에서 이력서 아이디 추출

    let data = await prisma.resume.findUnique({ // 이력서 상세 조회
      where: { id: +id, authorId }, // 이력서 아이디와 사용자 아이디를 조회
      include: { author: true }, //작성자 정보 포함
    });

    if (!data) { // 만약에 이력서가 없다면
      return res.status(HTTP_STATUS.NOT_FOUND).json({ // 404 상태 코드와 함께 메시지 변환
        status: HTTP_STATUS.NOT_FOUND, // 404 상태 코드
        message: MESSAGES.RESUMES.COMMON.NOT_FOUND, // 이력서 없음 메시지 변환
      });
    }

    data = { // 이력서 상세 데이터 매핑
      id: data.id, // 이력서 아이디
      authorName: data.author.name, // 작성자 이름
      title: data.title, // 제목
      content: data.content, // 내용
      status: data.status, // 상태
      createdAt: data.createdAt, // 생성 날짜
      updatedAt: data.updatedAt, // 업데이트 날짜
    };

    return res.status(HTTP_STATUS.OK).json({ // 200 상태 코드와 함께 메시지 변환
      status: HTTP_STATUS.OK, // 200 상태 코드
      message: MESSAGES.RESUMES.READ_DETAIL.SUCCEED, // 이력서 상제 조회 성공 메시지 변환
      data, // 이력서 상세 데이터
    });
  } catch (error) {
    next(error); // 오류 처리
  }
});

// 이력서 수정
resumesRouter.put('/:id', updateResumeValidator, async (req, res, next) => { // 이력서 수정 라우터
  try {
    const user = req.user; // 요청 본문에서 사용자 정보 추출
    const authorId = user.id; // 사용자 아이디 추출

    const { id } = req.params; // 요청 본문에서 이력서 아이디 추출

    const { title, content } = req.body; // 요청 본문에서 제목, 내용 추출

    let existedResume = await prisma.resume.findUnique({ // 이력서 조회
      where: { id: +id, authorId }, // 이력서 아이디, 사용자 아이디 조회
    });

    if (!existedResume) { // 이력서가 없다면?
      return res.status(HTTP_STATUS.NOT_FOUND).json({ // 404 상태 코드와 함께 메시지 변환
        status: HTTP_STATUS.NOT_FOUND, // 404 상태 코드
        message: MESSAGES.RESUMES.COMMON.NOT_FOUND, // 이력서 없음 메시지 변환
      });
    }

    const data = await prisma.resume.update({ // 이력서 수정 ( 데이터에 제목, 내용 업데이트 )
      where: { id: +id, authorId }, // 이력서 아이디, 사용자 아이디
      data: {
        ...(title && { title }), // 제목이 있다면 제목 없데이트
        ...(content && { content }), // 내용이 있다면 내용 업데이트
      },
    });

    return res.status(HTTP_STATUS.OK).json({ // 200 상태 코드와 함께 메시지 변환
      status: HTTP_STATUS.OK, // 200 상태 코드
      message: MESSAGES.RESUMES.UPDATE.SUCCEED, // 이력서 수정 성공 메시지 변환
      data, // 이력서 수정 데이터
    });
  } catch (error) {
    next(error); // 오류 처리
  }
});

// 이력서 삭제
resumesRouter.delete('/:id', async (req, res, next) => { // 이력서 삭제 라우터
  try {
    const user = req.user; // 요청 본문에서 사용자 정보 추출
    const authorId = user.id; // 사용자 아이디 추출

    const { id } = req.params; // 요청 본문에서 이력서 아이디 추출

    let existedResume = await prisma.resume.findUnique({ // 이력서 조회
      where: { id: +id, authorId }, // 이력서 아이디, 사용자 아이디 조회
    });

    if (!existedResume) { // 이력서가 없다면?
      return res.status(HTTP_STATUS.NOT_FOUND).json({ // 404 상태 코드와 함께 메시지 변환
        status: HTTP_STATUS.NOT_FOUND, // 404 상태 코드
        message: MESSAGES.RESUMES.COMMON.NOT_FOUND, // 이력서 없음 메시지 변환
      });
    }

    const data = await prisma.resume.delete({ where: { id: +id, authorId } }); // 이력서 삭제 ( 이력서 아이디, 사용자 아이디 )

    return res.status(HTTP_STATUS.OK).json({ // 200 상태 코드와 함께 메시지 변환
      status: HTTP_STATUS.OK, // 200 상태 코드
      message: MESSAGES.RESUMES.DELETE.SUCCEED, // 이력서 삭제 성공 메시지 변환
      data: { id: data.id }, // 이력서 아이디
    });
  } catch (error) {
    next(error); // 오류 처리
  }
});

export { resumesRouter };
