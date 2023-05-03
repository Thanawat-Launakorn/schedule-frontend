import type { NotificationPlacement } from "antd/es/notification/interface";
import { notification } from "antd";
type NotificationType = "success" | "info" | "warning" | "error";
type OpenNotification = {
  type: NotificationType;
  title?: string;
  placement?: NotificationPlacement;
  description?: string;
};

const msg = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error",
};
export const openNotification = (options: OpenNotification) => {
  notification[options.type]({
    message: options.title || msg[options.type],
    placement: options.placement || "top",
    description: options.description || null,
  });
};
