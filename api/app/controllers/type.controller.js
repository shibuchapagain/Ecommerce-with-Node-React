const TypeService = require("../services/type.service")
const slugify = require("slugify");

class TypeController {
    constructor() {
        this.type_svc = new TypeService();
    }
    getAllLists = async (req, res, next) => {
        try{
            let result = await this.type_svc.getAllTypes(req.type);
            res.json({
                retult: result,
                status: true, 
                msg: req.type+" fetched"
            })
        } catch(exception) {
            console.log("geAllList: ", exception);
            next({status: 422, msg: exception})
        }
    }
    createContent = async (req, res, next) => {
        try {
            let data = req.body;
            data.type = req.type;
            if(req.file){
                data.image = req.file.filename;
            }
            // title => Apple  Brand 
            // /apple-brand
            if(!data.link || data.link === 'null'){
                data.link = slugify(data.title,{lower: true})
            }
            await this.type_svc.validateData(data);

            let response = await this.type_svc.saveContent(data);

            if(response) {
                res.json({
                    result: data,
                    status: true,
                    msg: req.type+" created"
                })
            } else {
                throw "Problem while creating content"
            }

        } catch(exception) {
            console.log("createContent: ", exception);
            next({status: 422, msg: exception})
        }
    }
    updateContent = async (req, res, next) => {
        try {
            let data = req.body;
            let type = await this.type_svc.getTypeById(req.type, req.params.id)

            data.type = req.type;
            if(req.file){
                data.image = req.file.filename;
            } else {
                data.image = type.image;
            }
            
            if(!data.link || data.link === 'null'){
                data.link = type.link
            }
            await this.type_svc.validateData(data);

            let response = await this.type_svc.updateContent(data, req.params.id);

            if(response) {
                res.json({
                    result: data,
                    status: true,
                    msg: req.type+" updated"
                })
            } else {
                throw "Problem while updating content"
            }

        } catch(exception) {
            console.log("updateContent: ", exception);
            next({status: 422, msg: exception})
        }
    }
    getById = async (req, res, next) => {
        try{
            let data= await this.type_svc.getTypeById(req.type, req.params.id);
            res.json({
                result: data, 
                status: true, 
                msg: "Resource fetched."
            })
        } catch(except) {
            next({status: 422, msg: except})
        }
    }
    deleteById = async (req, res, next) => {
        try{
            let response = await this.type_svc.deleteById(req.type, req.params.id);
            res.json({
                result: response, 
                msg: "Content deleted successfully",
                status: true
            })
        } catch(exception){
            next({status: 422, msg: exception})
        }
    }
}

module.exports = TypeController;