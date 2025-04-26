import multer from 'multer';

export const fileValidation = {
    image: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
    video: ['video/mp4', 'video/mpeg', 'video/quicktime'],
    document: ['application/pdf', 'application/msword' , 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
};


function fileUpload(customValidation = []){
    const storage = multer.diskStorage({});

    function fileFilter(req,file,cb){
        if(customValidation.includes(file.mimetype)){
            cb(null,true);
    }else{
            cb('Invalid file type', false);
        }
    }
    const upload = multer({fileFilter, storage });
    return upload;
}

export default fileUpload;