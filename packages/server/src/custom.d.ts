declare namespace Express {
  export interface Request {
    locals?: {
      username?: string;
    };
  }
}
