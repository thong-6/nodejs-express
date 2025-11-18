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

const orderHistory = async (id: number) => {
    const orders = await prisma.order.findMany({
        where: {
            userId: id
        },
        include: {
            orderDetails: {
                include: {
                    product: true
                }
            }

        },

    })
    if (orders) return orders
    else return []
}

export {
    getAllOrder, getDetailOrder, orderHistory
}