import { FaChartPie, FaWallet } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { GoGoal } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { MdAnalytics } from "react-icons/md";

export const menuItems = [
  { icon: FaChartPie, label: "Overview", route: "/dashboard/user" },
  { icon: FaMoneyBillTransfer, label: "Transactions", route: "/dashboard/user/transactions" },
  { icon: FaWallet, label: "Wallet", route: "/dashboard/user/wallet" },
  { icon: MdAnalytics, label: "Reports", route: "/dashboard/user/reports" },
  { icon: GoGoal, label: "Goals", route: "/dashboard/user/goals" },
  { icon: CgProfile, label: "Profile", route: "/dashboard/profile/user/:id" },
];