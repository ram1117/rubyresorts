import { Response } from 'express';
import { json } from 'body-parser';
import RequestWithRawBody from '../interface/requestwithrawbody.interface';

function rawbodyMiddleware() {
  return json({
    verify: (
      request: RequestWithRawBody,
      response: Response,
      buffer: Buffer,
    ) => {
      if (request.url === '/payments/webhook' && Buffer.isBuffer(buffer)) {
        request.rawBody = Buffer.from(buffer);
      }
      return true;
    },
  });
}

export default rawbodyMiddleware;
