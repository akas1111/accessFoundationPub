import React from "react";
import Menuitems from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, Button, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import { getUserData } from "@/utils/UserContext";
import ContactInfo from "../../_components/dashboard/contact";
import { ROLES, USER } from "@/utils/endpoints";
import { useRouter } from "next/navigation";
import axios from "axios";

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const pathname = usePathname();
  const pathDirect = pathname;
  const { role = "", at }: any = getUserData();

  const handleRentLogin = async () => {
    try {
      const resp = await axios.post(USER.redirectToRent, { token: at });
      const redirectUrl = resp?.data?.data?.url ?? null;
      if (redirectUrl) {
        window.open(redirectUrl, "_blank");
      }
    } catch (e: any) {
      console.log(e);
    }
  };
  return (
    <Box
    //sx={{ px: 3 }}
    >
      <div className="px-3 mb-4">
        <List sx={{ pt: 0 }} className="sidebarNav" component="div">
          {Menuitems.filter((itm) => itm?.roles?.includes(role)).map((item) => {
            // {/********SubHeader**********/}
            if (item.subheader) {
              return <NavGroup item={item} key={item.subheader} />;

              // {/********If Sub Menu**********/}
              /* eslint no-else-return: "off" */
            } else {
              return (
                <NavItem
                  item={item}
                  key={item.id}
                  pathDirect={pathDirect}
                  onClick={toggleMobileSidebar}
                />
              );
            }
          })}
        </List>
      </div>
      {role === ROLES.customer && <ContactInfo />}
      <div className="text-center mt-3">
        <Button
          variant="outlined"
          onClick={() => {
            handleRentLogin();
          }}
        >
          Login to AxcessRent
        </Button>
      </div>
    </Box>
  );
};
export default SidebarItems;
