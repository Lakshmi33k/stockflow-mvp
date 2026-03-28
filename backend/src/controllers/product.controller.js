import {
  createProductService,
  getProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
} from "../services/product.service.js";

// CREATE
export const createProduct = async (req, res) => {
  try {
    const product = await createProductService(
      req.body,
      req.user.organizationId
    );
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET ALL
export const getProducts = async (req, res) => {
  try {
    const products = await getProductsService(
      req.user.organizationId
    );
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET ONE
export const getProductById = async (req, res) => {
  try {
    const product = await getProductByIdService(
      req.params.id,
      req.user.organizationId
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE
export const updateProduct = async (req, res) => {
  try {
    await updateProductService(
      req.params.id,
      req.body,
      req.user.organizationId
    );

    res.json({ message: "Product updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE
export const deleteProduct = async (req, res) => {
  try {
    await deleteProductService(
      req.params.id,
      req.user.organizationId
    );

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};