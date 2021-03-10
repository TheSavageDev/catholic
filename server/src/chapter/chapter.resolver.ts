import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { ChapterResolverBase } from "./base/chapter.resolver.base";
import { Chapter } from "./base/Chapter";
import { ChapterService } from "./chapter.service";

@graphql.Resolver(() => Chapter)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class ChapterResolver extends ChapterResolverBase {
  constructor(
    protected readonly service: ChapterService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
