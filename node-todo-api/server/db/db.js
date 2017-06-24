var mongoose=require('mongoose');

    mongoose.Promise=global.Promise;
    mongoose.connect(process.env.MONGODB_URI);
//'mongodb://amit00272:amit00272@ds135912.mlab.com:35912/todoapp' ||
module.exports={mongoose};
