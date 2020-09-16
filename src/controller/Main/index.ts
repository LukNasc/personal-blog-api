export default module.exports = {
    async index(req: any, res: any) {
        return res.json({
            message: "hello world"
        })
    },


    async auth(req: any, res: any) {
        const { user, password } = req.body;

    }
}