import prisma from "../config/db.js";

// CREATE PRODUCT
export const createProductService = async (data, organizationId) => {
  const product = await prisma.product.create({
    data: {
      ...data,
      organizationId,
    },
  });

  return product;
};

// GET ALL PRODUCTS
export const getProductsService = async (organizationId) => {
  return await prisma.product.findMany({
    where: { organizationId },
    orderBy: { createdAt: "desc" },
  });
};

// GET SINGLE PRODUCT
export const getProductByIdService = async (id, organizationId) => {
  return await prisma.product.findFirst({
    where: {
      id,
      organizationId,
    },
  });
};

// UPDATE PRODUCT
export const updateProductService = async (id, data, organizationId) => {
  return await prisma.product.updateMany({
    where: {
      id,
      organizationId,
    },
    data,
  });
};

// DELETE PRODUCT
export const deleteProductService = async (id, organizationId) => {
  return await prisma.product.deleteMany({
    where: {
      id,
      organizationId,
    },
  });
};