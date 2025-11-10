import { Request, Response } from "express";
import { getDetailProduct, handleCreateProduct, handleDeleteProduct, handleUpdateProduct } from "services/admin/product.service";

import { ProductSchema, TProductSchema } from "src/validations/product.schema";

const getCreateNewProduct = async (req: Request, res: Response) => {
    const errors = [];
    const data = {
        name: "",
        price: "",
        detailDesc: "",
        shortDesc: "",
        quantity: "",
        factory: "",
        target: ""
    }
    return res.render('admin/product/create.ejs', {
        errors, data
    });
}
const postCreateNewProduct = async (req: Request, res: Response) => {
    const { name, price, detailDesc, shortDesc, quantity, factory, target } = req.body as TProductSchema;
    const validate = ProductSchema.safeParse(req.body);

    if (!validate.success) {
        const errorZod = validate.error.issues;
        const errors = errorZod?.map(item => `${item.message} (${item.path[0]})`);
        const data = {
            name, price, detailDesc, shortDesc, quantity, factory, target
        }
        return res.render('admin/product/create.ejs', {
            errors, data
        });
    }
    const file = req.file;
    const image = file?.filename ?? null;
    await handleCreateProduct(name, price, detailDesc, shortDesc, quantity, factory, target, image);

    return res.redirect('/admin/product');
}
const postUpdateProduct = async (req: Request, res: Response) => {
    const { id, name, price, detailDesc, shortDesc, quantity, factory, target } = req.body;
    const file = req.file;
    const image = file?.filename ?? undefined;
    await handleUpdateProduct(id, name, price, detailDesc, shortDesc, quantity, factory, target, image);
    return res.redirect('/admin/product');
}
const getViewProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await getDetailProduct(id);
    const factoryOptions = [
        { name: "Apple (MacBook)", value: "APPLE" },
        { name: "Asus", value: "ASUS" },
        { name: "Lenovo", value: "LENOVO" },
        { name: "Dell", value: "DELL" },
        { name: "LG", value: "LG" },
        { name: "Acer", value: "ACER" },
    ];

    const targetOptions = [
        { name: "Gaming", value: "GAMING" },
        { name: "Sinh viên - Văn phòng", value: "SINHVIEN-VANPHONG" },
        { name: "Thiết kế đồ họa", value: "THIET-KE-DO-HOA" },
        { name: "Mỏng nhẹ", value: "MONG-NHE" },
        { name: "Doanh nhân", value: "DOANH-NHAN" },
    ];

    return res.render('admin/product/detail.ejs', { id, product, factoryOptions, targetOptions });
}
const postDeleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    await handleDeleteProduct(id);
    return res.redirect('/admin/product');
}
export {
    getCreateNewProduct, postCreateNewProduct, postUpdateProduct, getViewProduct, postDeleteProduct
};