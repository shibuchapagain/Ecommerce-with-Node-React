const isAdmin =  (req, res, next) => {
    let role = req.auth_user.role;
    if(role === 'admin'){
        next();
    } else {
        next({status: 403, msg: "Unauthorized access."})
    }
}

const isAdminSeller =  (req, res, next) => {
    let role = req.auth_user.role;
    if(role === 'admin' || role === 'seller'){
        next();
    } else {
        next({status: 403, msg: "Unauthorized access."})
    }
}

const isSeller =  (req, res, next) => {
    next();
}

const isCustomer =  (req, res, next) => {
    next();
}

module.exports = {
    isAdmin,
    isSeller,
    isAdminSeller,
    isCustomer
};