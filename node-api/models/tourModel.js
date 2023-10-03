const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"], // 必填
    unique: true, //主键
    trim: true,
    maxlength: [40, "A tour must have less or equal than 40 characters"],
    minlength: [10, "A tour must have more or equal than 10 characters"], // 逗号
    validate: [validator.isAlpha, "Tour name mist only contain characters"]
  }, duration: {
    type: Number, required: [true, "A tour must have a duration"]
  }, maxGroupSize: {
    type: Number, required: [true, "A tour must have a group size"]
  }, difficulty: {
    type: String, required: [true, "A tour must have a difficulty"], enum: {
      values: ["easy", "medium", "difficult"], message: "Difficulty is either: easy, medium, or difficult" // message
    }
  }, ratingsAverage: {
    type: Number, default: 4.5 //默认
  }, ratingsQuantity: {
    type: Number, default: 0 // 分号
  }, price: {
    type: Number, required: [true, "A tour must have a price"] // 分号
  }, priceDiscount: {
    type: Number, validate: {
      message: "Discount price {{VALUE}} should be below regular price", validator: function(val) {
        // 校验器
        // this only points to current doc on NEW document creation
        return val < this.price;
      }, message: "Discount price ({VALUE}) should be below the regular price"
    }
  }, summary: {
    type: String, trim: true, required: [true, "A tour must have a description"] // 分号
  }, description: {
    type: String, trim: true // 分号
  }, imageCover: {
    type: String, required: [true, "A tour must have a cover image"]
  }, images: [String], createdAt: {
    type: Date, default: Date.now(), select: false // 分号
  }, startDates: [Date], secretTour: {
    type: Boolean, default: false // 分号
    // 数据库中存在 但mongoose查不到
  }
}, {
  toJSON: { virtuals: true }, toObject: { virtuals: true }
  // 默认不查询 虚拟字段
});

tourSchema.virtual("durationWeeks").get(function() {
  return this.duration / 7;
});

tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} ms`);
  // console.log(docs);
  next();
});

//AGGREGATION MIDDLEWARE
tourSchema.pre("aggregate", function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

  console.log(this.pipeline()); // 指向当前的聚合对象
  next();
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;