import {Query} from "mongoose";


class ApiFeatures<T> {
    public query: Query<T[],T>;
    private queryString: Record<string, any>;

    constructor(query: Query<T[],T>, queryString: Record<string, any>) {
        this.queryString = queryString;
        this.query = query;
    }

    filter() : this {
        const queryObj = {...this.queryString}
        const excFields = ['page','sort','limit','fields'];
        excFields.forEach(field => {delete queryObj[field];});

        let queryStr = JSON.stringify(queryObj);

        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,(match) => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr))

        return this;
    }

    sort() : this {
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(" ")
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }

    limitFields() : this {
        if(this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(" ");
            this.query = this.query.select(fields);
        }else{
            this.query = this.query.select('-__v')
        }
        return this;
    }

    paginate() : this {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

export default ApiFeatures;