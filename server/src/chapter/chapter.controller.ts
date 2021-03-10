import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ChapterService } from "./chapter.service";
import { ChapterControllerBase } from "./base/chapter.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("chapters")
@common.Controller("chapters")
export class ChapterController extends ChapterControllerBase {
  constructor(
    protected readonly service: ChapterService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
