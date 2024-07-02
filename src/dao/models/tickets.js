import {Schema, model} from 'mongoose';

const nameCollection = 'Ticket';

const TicketSchema = new Schema({
    code:{type:String, require:true, unique:true},
    purchase_datetime: { type: Date, required: true, default: Date.now },
    amount:{type:Number, require:true},
    purchaser:{type:String, require:true}
});

export const TicketModel = model(nameCollection, TicketSchema);