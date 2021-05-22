exports.getUserObject = (req, res) => {
    const {user} = req
    res.status(200).json({
        status: "ok",
        message: {
            user:user
        }
    })
};

