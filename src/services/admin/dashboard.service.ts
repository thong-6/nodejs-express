import { prisma } from 'config/client'
const countData = async () => {
    const cntUser = await prisma.user.count()
    const cntProduct = await prisma.product.count()
    const cntOrder = await prisma.order.count()
    return {
        cntUser, cntProduct, cntOrder
    };
}
export {
    countData
}