class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query; //This query will be actual query like Product.find().findByIdAndUpdate() etc.
    this.queryStr = queryStr; //This queryStr will be a specific part of URL which hit from user.Like user search for a specific product and this part (/?keyword=samosa) will be queryStr
  }

  //Method for searching product
  Search() {
    //here we find keyword and add option = "i" for case insensitive and in keyword there will be a search keyword like product name
    const keyword = this.queryStr.keyword
      ? {
          // search will be by the name of product
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    //   now in the this.query means in query there is a query of mongodb for find product on the basis of keyword
    this.query = this.query.find({ ...keyword });

    // and this hold all class means in this there is also a Search() method for calling.
    return this;
  }

  //filter on the basis of category and price
  filter() {
    //here we copy queryStr in queryCopy variable for getting queryStr because in JS we cannot direct copy any thing in another thing that's why we apply spread operator for copying queryStr now in queryCopy we also have queryStr(req.query)
    const queryCopy = { ...this.queryStr };
    // console.log(`queryCopy : ${queryCopy}`);

    //Now remove some fields from this queryCopy for only remaining category in req.query(queryCopy) and after this there is only category and price if user give available in queryCopy
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);
    // console.log(`After removing queryCopy : ${queryCopy}`);

    //Now for add the $ in before of price(gt ,lt , gte , lte) so first we convert queryCopy to string for applying replace method
    let queryStr = JSON.stringify(queryCopy);
    // console.log(`After stringify queryCopy : ${queryCopy}`);

    //here we replace gt , gte ,lt ,lte to $gt , $lt ,$gte  , $lte by using replace method
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    // console.log(`queryCopy after replacing : ${queryCopy}`);

    //Now storing find() with pared queryCopy in this.query now in this queryStr there is only category and price available
    this.query = this.query.find(JSON.parse(queryStr));
    // console.log(this.query);

    return this;
  }

  //Method for setting pagination(means who many products will show in one page)
  pagination(productPerPage) {
    //Here code for currentPage mean which page is open it will become from queryStr(req.query) or by default always page is first
    const currentPage = Number(this.queryStr.page) || 1;

    //Here is code for how many pages should skip on the basis of productPerPage mean if productPerPage is 8 then in 3rd page there will skip 16 products will skipped
    const skip = productPerPage * (currentPage - 1);

    //here we write code for we apply find() and also apply limit(8) and how many products skip(skip)
    this.query = this.query.limit(productPerPage).skip(skip);

    return this;
  }
}

export { ApiFeatures };
