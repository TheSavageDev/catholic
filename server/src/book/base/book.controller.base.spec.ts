import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { BasicAuthGuard } from "../../auth/basicAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { BookController } from "../book.controller";
import { BookService } from "../book.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  chapters: 42,
  createdAt: new Date(),
  id: "exampleId",
  testament: "exampleTestament",
  title: "exampleTitle",
  updatedAt: new Date(),
  verses: 42,
};
const CREATE_RESULT = {
  chapters: 42,
  createdAt: new Date(),
  id: "exampleId",
  testament: "exampleTestament",
  title: "exampleTitle",
  updatedAt: new Date(),
  verses: 42,
};
const FIND_MANY_RESULT = [
  {
    chapters: 42,
    createdAt: new Date(),
    id: "exampleId",
    testament: "exampleTestament",
    title: "exampleTitle",
    updatedAt: new Date(),
    verses: 42,
  },
];
const FIND_ONE_RESULT = {
  chapters: 42,
  createdAt: new Date(),
  id: "exampleId",
  testament: "exampleTestament",
  title: "exampleTitle",
  updatedAt: new Date(),
  verses: 42,
};

const service = {
  create() {
    return CREATE_RESULT;
  },
  findMany: () => FIND_MANY_RESULT,
  findOne: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

describe("Book", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: BookService,
          useValue: service,
        },
      ],
      controllers: [BookController],
      imports: [MorganModule.forRoot(), ACLModule],
    })
      .overrideGuard(BasicAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /books", async () => {
    await request(app.getHttpServer())
      .post("/books")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /books", async () => {
    await request(app.getHttpServer())
      .get("/books")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /books/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/books"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /books/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/books"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
