import { LucideIcon } from "lucide-react";

export default interface DashboardCardProps {
  title: string;
  count: number;
  icon: React.ReactElement<LucideIcon>;
}
