declare module 'express-async-handler' {
  import { RequestHandler } from 'express';
  
  function expressAsyncHandler<T = any, P = any>(
    handler: (req: T, res: P, next: any) => Promise<any>
  ): RequestHandler;
  
  export = expressAsyncHandler;
} 