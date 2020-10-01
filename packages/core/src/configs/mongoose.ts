export default {

  url: process.env.MONGOOSE_URL || null,

  options: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
};