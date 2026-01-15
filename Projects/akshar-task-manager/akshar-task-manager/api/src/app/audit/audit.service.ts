import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditService {
  log(action: string, user: any, metadata?: any) {
    const timestamp = new Date().toISOString();
    console.log(
      `[${timestamp}] ${user.role} (userId=${user.userId}, orgId=${user.orgId}) ${action}`,
      metadata ?? ''
    );
  }
}
