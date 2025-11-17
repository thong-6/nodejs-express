import { prisma } from 'config/client'
const getAllOrder = async () => {
    const orders = await prisma.order.findMany({
        include: {
            user: true
        }
    });
    return orders;
}


const getDetailOrder = async (id: string) => {
    const orderDetails = await prisma.orderDetail.findMany({
        where: {
            orderId: +id
        },
        include: {
            product: true
        }

    })
    return orderDetails;
}

export {
    getAllOrder, getDetailOrder
}