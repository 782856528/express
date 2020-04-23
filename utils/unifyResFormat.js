module.exports = (req,res, next) => {
    res.setUnifyResFormat = (data,code,message) => {
        let res = {}
        if(code === 200) {
            res = {
                data,
                status: code,
                message
            }
        } else {
            res = {
                status: code,
                message
            }
        }
        return res
    };
    next()
}