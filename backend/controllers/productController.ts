import { Request, Response } from "express";
import Product from "../models/Product";
import type { PaginationQuery } from "../types/product";

// [GET] /api/products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const { search, page = "1", limit } = req.query as PaginationQuery;
    const pageNum = parseInt(page);
    const limitNum = limit ? parseInt(limit) : 0;
    const skip = (pageNum - 1) * limitNum;

    const query: any = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    const [products, total] = await Promise.all([
      Product.find(query).sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum || 0),
      Product.countDocuments(query),
    ]);
    res.json({
      success: true,
      products,
      pagination: {
        page: pageNum,
        limit: limitNum || total,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  }catch(error){
    console.error("Error fetching products:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error",error });
  }
};

// [GET] /api/products/:id
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch {
    res.status(400).json({ message: "Invalid product ID" });
  }
};

// [POST] /api/products
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, image } = req.body;
    const newProduct = await Product.create({ name, description, price, image });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: "Invalid input" });
  }
};

// [PUT] /api/products/:id
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Invalid data or ID" });
  }
};

// [DELETE] /api/products/:id
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch {
    res.status(400).json({ message: "Invalid product ID" });
  }
};
