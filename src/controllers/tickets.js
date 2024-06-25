import { createTicketService } from "../services/tickets";

export const createTicket = async (req = request, res = response) => {
    try {
        const carrito = await createTicketService();
        return res.json({msg: 'Ticket creado', carrito}) 
    } catch (error) {
        console.log('createTicket --- ', error);
        return res.status(500).json({msg: 'Hablar con un administrador'});
    }
}