import { prisma } from "config/client"
import { create } from "domain";

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
    if (cart) {
        const detailCartsProduct = await prisma.cartDetail.findMany({
            where: {
                cartId: cart.id
            },
            include: {
                product: true
            }
        })
        return detailCartsProduct;
    } else {
        return []
    }

}
const handlePlaceOrder = async (
    id: number,
    receiverAddress: string,
    receiverName: string,
    receiverPhone: string,
    totalPrice: number
) => {
    const cart = await prisma.cart.findFirst({
        where: {
            userId: id
        },
        include: {
            cartDetails: true
        }
    })
    const dataCart = cart?.cartDetails?.map(
        item => ({
            productId: item.productId,
            price: item.price,
            quantity: item.quantity

        })
    ) ?? []
    await prisma.order.create({
        data: {
            totalPrice: totalPrice,
            paymentMethod: "COD",
            paymentStatus: "PAYMENT_UNPAID",
            paymentRef: "",
            receiverAddress: receiverAddress,
            receiverName: receiverName,
            receiverPhone: receiverPhone,
            status: "PENDING",
            userId: id,
            orderDetails: {
                create: dataCart
            }
        }
    })
    await prisma.cartDetail.deleteMany({
        where: {
            cartId: cart.id
        }
    })
    await prisma.cart.delete({
        where: { userId: id }
    })

}


const deleteProductCart = async (id: number) => {
    const cartDetail = await prisma.cartDetail.findFirst({
        where: {
            id
        }
    })
    const cartId = cartDetail.cartId;
    const cart = await prisma.cart.findFirst({
        where: {
            id: cartId
        }
    })
    if (cart.sum > cartDetail.quantity) {
        await prisma.cart.update({
            where: {
                id: cartId
            },
            data: {
                sum: {
                    increment: -cartDetail.quantity
                }
            }
        })
        await prisma.cartDetail.delete({
            where: {
                id
            }
        })
        return

    } else {
        await prisma.cartDetail.delete({
            where: {
                id
            }
        })
        await prisma.cart.delete({
            where: {
                id: cartId
            }
        })
        return
    }

}



export {
    getProduct, getProductById, handlePlaceOrder,
    addProductToCart, getDetailCart, deleteProductCart
}