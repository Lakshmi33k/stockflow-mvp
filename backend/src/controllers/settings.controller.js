import {
  getSettingsService,
  updateSettingsService,
} from "../services/settings.service.js";

// GET SETTINGS
export const getSettings = async (req, res) => {
  try {
    const data = await getSettingsService(
      req.user.organizationId
    );
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE SETTINGS
export const updateSettings = async (req, res) => {
  try {
    const data = await updateSettingsService(
      req.user.organizationId,
      req.body
    );
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};