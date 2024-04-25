import mongoose, {Schema, Document, Model} from 'mongoose'

interface vandorDoc extends Document {
    name : string;
    ownerName : string;
    foodType : [string];
    pincode : string;
    address : string;
    phone : string;
    email : string;
    password : string;
    salt : string;
    serviceAvailable : string;
    coverImages : [string];
    rating : number;
    foods : any
}

const VandorSchema = new Schema ({
    name : {type : String, required : true},
    ownerName : { type : String, required : true},
    foodType : [String],
    pincode : String,
    address : String,
    phone : String,
    email : String,
    password : String,
    salt : String,
    serviceAvailable : String,
    coverImages : [String],
    rating : String,
    foods : [{
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'food'
    }]

},{
    toJSON : {
        transform(doc,ret){
            delete ret.password,
            delete ret.salt,
            delete ret.__v,
            delete ret.createdAt,
            delete ret.updatedAt
        }
    },
    timestamps : true
})

const Vandor = mongoose.model<vandorDoc>('Vandor',VandorSchema)

export { Vandor}