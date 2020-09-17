import {Response, Request, NextFunction} from 'express'
export default module.exports = (req: Request, res:Response, next:NextFunction) => {
  res.json({
    body: req.body,
    query: req.query,
    cookies: req.cookies,
  })
}
