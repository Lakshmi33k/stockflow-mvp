import { getDashboardService } from "../services/dashboard.service.js";

export const getDashboard = async (req, res) => {
  try {
    const data = await getDashboardService(
      req.user.organizationId
    );

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};