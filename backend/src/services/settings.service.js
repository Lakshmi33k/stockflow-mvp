import prisma from "../config/db.js";

// GET SETTINGS
export const getSettingsService = async (organizationId) => {
  let settings = await prisma.setting.findUnique({
    where: { organizationId },
  });

  // If not exists → create default
  if (!settings) {
    settings = await prisma.setting.create({
      data: {
        organizationId,
        defaultLowStockThreshold: 5,
      },
    });
  }

  return settings;
};

// UPDATE SETTINGS
export const updateSettingsService = async (
  organizationId,
  data
) => {
  let settings = await prisma.setting.findUnique({
    where: { organizationId },
  });

  // If not exists → create
  if (!settings) {
    return await prisma.setting.create({
      data: {
        organizationId,
        defaultLowStockThreshold:
          data.defaultLowStockThreshold || 5,
      },
    });
  }

  // If exists → update
  return await prisma.setting.update({
    where: { organizationId },
    data,
  });
};