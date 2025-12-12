import { Request , Response } from "express";
import productModel from "../models/productModel";

export const getProducts = async (req:Request , res:Response) =>{

    const result = await productModel.find();
    res.status(200).json({
        message:"Success",
        products:result,
    })

}

export const addProducts = async (req: Request, res: Response) => {
  try {
    const { name, quantity, price, description } = req.body;

    if (!name || !quantity || !price || !description) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const result = await productModel.create({
      name,
      quantity,
      price,
      description,
    });

    return res.status(201).json({
      message: "Product added successfully",
      product: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const nums =[1,2,3]
    nums.sort();
    

    if (!id) {
      return res.status(400).json({
        message: "Invalid Id",
      });
    }

    const result = await productModel.deleteOne({ id });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};


export const addReview = async (req:Request, res:Response) => {
  try {
    const { productId } = req.params;
    const { userId, userName, rating, comment } = req.body;

    // Find product
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Push review
    product.reviews.push({
      userId,
      userName,
      rating,
      comment,
    });

    await product.save();

    return res.status(201).json({
      message: "Review added successfully",
      reviews: product.reviews,
    });
  } catch (err:any) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

