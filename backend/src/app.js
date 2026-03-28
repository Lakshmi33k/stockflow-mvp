import dashboardRoutes from "./routes/dashboard.routes.js";
import settingsRoutes from "./routes/settings.routes.js";


app.use("/api/dashboard", dashboardRoutes);

app.use("/api/settings", settingsRoutes);