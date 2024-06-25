import { TicketModel } from "../dao/models/tickets";

export const createTicketService = async () => {
    try {
        return await TicketModel.create({});
    } catch (error) {
        console.log('createTicketService --- ', error);
        throw error;
    }
}