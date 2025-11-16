import { prisma } from "config/client"

const getProduct = async () => {
    const products = await prisma.product.findMany();
    return products;
}
const getProductById = async (id: number) => {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    });
    return product;
}

const addProductToCart = async (quantity: number, id: string, user: Express.User) => {

    const product = await prisma.product.findUnique({
        where: {
            id: +id
        }
    });
    const cartId = await prisma.cart.findUnique({
        where: {
            userId: user.id
        }
    })
    if (cartId) {
        //update table cart
        await prisma.cart.update({
            where: {
                userId: user.id
            },
            data: {
                sum: {
                    increment: quantity
                }
            }
        })
        //update table cart detail
        const productInCartDetail = await prisma.cartDetail.findFirst({
            where: {
                productId: product.id,
                cartId: cartId.id
            }
        })
        await prisma.cartDetail.upsert({
            where: {
                id: productInCartDetail?.id ?? 0
            },
            update: {
                quantity: {
                    increment: quantity
                },
                price: {
                    increment: product.price
                }
            },
            create: {
                cartId: cartId.id,
                productId: product.id,
                quantity: quantity,
                price: product.price
            },
        })

    }
    else {
        //create
        await prisma.cart.create({
            data: {
                userId: user.id,
                sum: quantity,
                cartDetails: {
                    create: [
                        {
                            productId: +id,
                            quantity: quantity,
                            price: product.price
                        }
                    ]
                }
            }
        })

    }
}

const getDetailCart = async (id: number) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId: id
        }
    })
    const detailCartsProduct = await prisma.cartDetail.findMany({
        where: {
            cartId: cart.id
        },
        include: {
            product: true
        }
    })
    return detailCartsProduct;
}



export {
    getProduct, getProductById,
    addProductToCart, getDetailCart
}