import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * Used in any REST APIs
 */
export class JwtAuthGuard extends AuthGuard('jwt') {}