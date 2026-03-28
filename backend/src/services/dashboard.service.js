import prisma from "../config/db.js";

export const getDashboardService = async (organizationId) => {
  // 1. Get total products
  const totalProducts = await prisma.product.count({
    where: { organizationId },
  });

  // 2. Get total quantity
  const quantityResult = await prisma.product.aggregate({
    where: { organizationId },
    _sum: {
      quantity: true,
    },
  });

  const totalQuantity = quantityResult._sum.quantity || 0;

  // 3. Get default threshold from settings
  const settings = await prisma.setting.findUnique({
    where: { organizationId },
  });

  const defaultThreshold = settings?.defaultLowStockThreshold || 5;

  // 4. Get all products
  const products = await prisma.product.findMany({
    where: { organizationId },
  });

  // 5. Filter low stock
  const lowStockProducts = products.filter((product) => {
    const threshold =
      product.lowStockThreshold ?? defaultThreshold;

    return product.quantity <= threshold;
  });

  return {
    totalProducts,
    totalQuantity,
    lowStockProducts,
  };
};