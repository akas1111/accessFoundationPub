import { ROLES } from "@/utils/endpoints";
import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
  IconCoin,
  IconBuildingBank,
  IconUsersGroup,
  IconCreditCard,
  IconId,
  IconPigMoney,
  IconMoneybag,
} from "@tabler/icons-react";
import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    roles: [ROLES.customer, ROLES.admin, ROLES.superadmin],
    subheader: "Home",
  },

  {
    id: uniqueId(),
    roles: [ROLES.customer, ROLES.admin, ROLES.superadmin],
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    id: uniqueId(),
    roles: [ROLES.customer],
    title: "Document Request",
    icon: IconId,
    href: "/document-request",
    level: 2,
  },
  // {
  //   id: uniqueId(),
  //   roles: ["ROLE_CUSTOMER", "ROLE_ADMIN"],
  //   title: "My Loan",
  //   icon: IconCoin,
  //   href: "/loan/list",
  // },
  // {
  //   navlabel: true,
  //   subheader: "Utilities",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Typography",
  //   icon: IconTypography,
  //   href: "/utilities/typography",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Shadow",
  //   icon: IconCopy,
  //   href: "/utilities/shadow",
  // },
  // {
  //   navlabel: true,
  //   subheader: "Auth",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Login",
  //   icon: IconLogin,
  //   href: "/authentication/login",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Register",
  //   icon: IconUserPlus,
  //   href: "/authentication/register",
  // },
  // {
  //   navlabel: true,
  //   subheader: "Extra",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Icons",
  //   icon: IconMoodHappy,
  //   href: "/icons",
  // },
  // {
  //   id: uniqueId(),
  //   roles: ["ROLE_CUSTOMER", "role_admin"],
  //   title: "Sample Page",
  //   icon: IconAperture,
  //   href: "/sample-page",
  // },
  {
    navlabel: true,
    roles: [ROLES.admin, ROLES.superadmin],
    subheader: "Admin",
  },
  {
    id: uniqueId(),
    roles: [ROLES.admin, ROLES.superadmin],
    title: "Loan Requests",
    icon: IconBuildingBank,
    href: "/admin/loan-requests",
  },
  {
    id: uniqueId(),
    roles: [ROLES.admin, ROLES.superadmin],
    title: "AML/KYC Report",
    icon: IconUsersGroup,
    href: "/admin/kyc-reports",
  },
  {
    id: uniqueId(),
    roles: [ROLES.admin, ROLES.superadmin],
    title: "Saving Programs",
    icon: IconMoneybag,
    href: "/admin/saving-programs",
  },
  {
    navlabel: true,
    roles: [ROLES.superadmin],
    subheader: "SuperAdmin",
  },
  {
    id: uniqueId(),
    roles: [ROLES.superadmin],
    title: "Credit Report",
    icon: IconCreditCard,
    href: "/admin/credit-reports",
  },
];

export default Menuitems;
