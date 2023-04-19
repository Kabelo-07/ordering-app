import { CanActivate, ExecutionContext, Inject, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { catchError, Observable, tap } from "rxjs";
import { AUTH_SERVICE } from "./services";

export class JwtAuthGuard implements CanActivate {

    constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const authValue = this.getAuthentication(context);
        return this.authClient.send('validate_user', {
            Authentication: authValue
        }).pipe(
            tap((res) => {
                this.addUser(res, context);
            }),
            catchError(() => {
                throw new UnauthorizedException(); 
            })
        )
    }
    
    private addUser(user: any, context: ExecutionContext) {
        if (context.getType() === 'rpc') {
            context.switchToRpc().getData().userInfo = user;
        } else if (context.getType() === 'http') {
            context.switchToHttp().getRequest().user = user;
        }
    }


    private getAuthentication(context: ExecutionContext) {
        let authentication: string;
        
        if(context.getType() === 'rpc') {
            authentication = context.switchToRpc().getData().Authentication;
        } else if (context.getType() === 'http') {
            authentication = context.switchToHttp().getRequest().cookies?.Authentication;
        }

        if (!authentication) {
            throw new UnauthorizedException("No value was provided for authentication");
        }

        return authentication;
    }
    
}
