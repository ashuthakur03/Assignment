/* eslint-disable */
const { body, validationResult } = require('express-validator');
const mongoose = require("mongoose");
const { sanitizeBody } = require('express-validator');
const Registerdb = require('../../task/models/Register');
const apiResponse = require('../components/apiresponse');
const auth = require('../Config/Authentications');
const multer = require("multer");



	module.exports.Register = [
	body('Name').isLength({ min: 1 }).trim().withMessage("Name must be specified"),
	body('EmailAddress').isLength({ min: 1 }).trim().withMessage("EmailAddress must be specified"),
	body('Password').isLength({ min: 1 }).trim().withMessage("Password must be specified"),
	body('Imageupload').isLength({ min: 1 }).trim().withMessage("Imageupload must be specified"),
	sanitizeBody('Name').escape(),
	sanitizeBody('EmailAddress').escape(),
	sanitizeBody('Password').escape(),
	sanitizeBody('Imageupload').escape(),    
	(async (req, res) => {
		try {
			const errors = validationResult(req);
			console.log(req.body)
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, 'Validation Error.', errors.array());
			}
           
			const info = new Registerdb(req.body).save((err, feature) =>  {
				if (err) {
					return apiResponse.ErrorResponse(res, err);
				}
				const token = auth.createToken(feature._id,feature.EmailAddress)
				const obj = {
					_id: feature._id,
					name: feature.name,
					EmailAddress: feature.EmailAddress,
					token: token
				}
				
				return apiResponse.successResponseWithData(res, 'Register has been created successfully', obj);
			});

		} catch (err) {
			console.log(err)
			return apiResponse.ErrorResponse(res, err);
		}
	})];


module.exports.login = [
	body('EmailAddress').isLength({ min: 1 }).trim().withMessage("EmailAddress must be specified"),
	body('Password').isLength({ min: 1 }).trim().withMessage("Password must be specified"),
	sanitizeBody('EmailAddress').escape(),
	sanitizeBody('Password').escape(),
	(async (req, res) => {
		try {
			const errors = validationResult(req);
			console.log(req.body)
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, 'Validation Error.', errors.array());
			}
           
			Registerdb.findOne({EmailAddress:req.body.EmailAddress,Password:req.body.Password}).exec(async (err, feature) => {
				if (err) {
					return apiResponse.ErrorResponse(res, err);
				}

				if (!feature) {
					return apiResponse.unauthorizedResponseWithMessage(res, 'username or password invalid', feature);
				}

				const token = auth.createToken(feature._id,feature.EmailAddress)
				const obj = {
					_id: feature._id,
					name: feature.name,
					EmailAddress: feature.EmailAddress,
					token: token
				}
				return apiResponse.successResponseWithData(res, 'login successfully', obj);
			});

		} catch (err) {
			console.log(err)
			return apiResponse.ErrorResponse(res, err);
		}
	})];





	module.exports.getlist = [
	(req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, 'Validation Error.', errors.array());
			}
			Registerdb.find().exec(async (err, features) => {
				if (err) {
					return apiResponse.ErrorResponse(res, err);
				}
				return apiResponse.successResponseWithData(res, 'Successfully fetch', features);
			});
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}
	}];



const DIR  	  =  './Public'


	const storage = multer.diskStorage({
	destination: (req, file, callBack) => {
	callBack(null, DIR)
	},
	filename: (req, file, callBack) => {
	var generateRandom = Math.floor(1000 + Math.random() * 9000);
	callBack(null, `FunOf`+generateRandom+`Heuristic_${file.originalname}`)
	}
	})
	  
  const upload = multer({ storage: storage })
module.exports.uploadProductImages =[
	            upload.array('files'),(req,res)=>{
	          	try {
    				  const files = req.files;
			         if (!files) {
				      const error = new Error('No File')
			  			return apiResponse.unauthorizedResponse(res, "File not Found");
			        }else{
			        	
			        	var images=[]
			        	for(let i=0;i<files.length;i++){
			        		images.push("/Public/"+files[i].filename)
			        	}
		      		return apiResponse.successResponseWithData(res, "Successfully uploaded.",images);
				  }
		       }catch (err) {
			       return apiResponse.ErrorResponse(res, err);
         }
}]