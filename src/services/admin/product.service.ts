import { prisma } from 'config/client'
const getAllProduct = async () => {
    const products = await prisma.product.findMany();
    return products;
}
//product
const handleCreateProduct = async (
    name: string,
    price: number,
    detailDesc: string,
    shortDesc: string,
    quantity: number,
    factory: string,
    target: string,
    image: string) => {

    const product = await prisma.product.create({
        data: {
            name: name,
            price: +price,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            quantity: +quantity,
            factory: factory,
            target: target,
            image: image
        },
    })
}

const handleDeleteProduct = async (id: string) => {

    const deleteProduct = await prisma.product.delete({
        where: {
            id: +id
        },
    })
}
const handleUpdateProduct = async (id: string, name: string, price: number, detailDesc: string, shortDesc: string, quantity: number, factory: string, target: string, image: string) => {

    const updateProduct = await prisma.product.update({
        where: {
            id: +id
        },
        data: {
            name: name,
            price: +price,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            quantity: +quantity,
            ...(image !== undefined && { image: image })
        },
    })
}
const getDetailProduct = async (id: string) => {
    const product = await prisma.product.findUnique({
        where: {
            id: +id
        },
    })
    return product;
}
export {
    getAllProduct, handleCreateProduct, handleDeleteProduct, handleUpdateProduct, getDetailProduct
}