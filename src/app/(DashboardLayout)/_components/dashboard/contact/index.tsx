"use client";
import React, { ReactNode, useState } from "react";
import DashboardCard from "@/app/(DashboardLayout)/_components/shared/DashboardCard";
import { Collapse, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Link from "next/link";
import styles from "./style.module.css";
import {
  IconAppWindow,
  IconAppWindowFilled,
  IconMailFilled,
  IconMapPinFilled,
  IconMessage,
  IconMessageCircle2Filled,
  IconPhone,
  IconPhoneFilled,
  IconWorld,
} from "@tabler/icons-react";
import BlankCard from "../../shared/BlankCard";
import { IconMapPin } from "@tabler/icons-react";
import { IconMail } from "@tabler/icons-react";
import {
  ArrowDropDown,
  ArrowDropUp,
  Comment,
  Phone,
} from "@mui/icons-material";

// export default function ContactInfo() {
//   return (
//     <Box className={styles.contactWrap} sx={{ bgcolor: "primary.main" }}>
//       <Typography
//         variant="h5"
//         className="fw-bold mb-0"
//         //sx={{ bgcolor: "primary.main", color: "#fafafa" }}
//       >
//         HELP CENTER
//       </Typography>
//       {/* <Typography variant="h6">Get In Touch</Typography> */}
//       <Typography
//         variant="body1"
//         className="mb-3 pb-2 border-bottom"
//         sx={{ color: "grey.300" }}
//       >
//         Do not hesitate to contact us.
//       </Typography>
//       <SingleContact title="Address" icon={<IconMapPin size={18} />}>
//         <>
//           <Typography>6954 Americana Pkwy reynoldsburg, Ohio 43068</Typography>
//         </>
//       </SingleContact>
//       <SingleContact title="Phone" icon={<IconPhone size={18} />}>
//         <>
//           <Typography>614-714-6011</Typography>
//         </>
//       </SingleContact>
//       <SingleContact title="Email Address" icon={<IconMail size={18} />}>
//         <>
//           <a href="mailto:info@axcessfoundation.org">
//             <Typography>info@axcessfoundation.org</Typography>
//           </a>
//         </>
//       </SingleContact>
//       <SingleContact title="Website" icon={<IconAppWindow size={18} />}>
//         <>
//           <Link href="https://axcessfoundation.org" target="_blank">
//             <Typography>axcessfoundation.org</Typography>
//           </Link>
//         </>
//       </SingleContact>
//     </Box>
//   );
// }
export default function ContactInfo() {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <Box className={styles.contactWrap}>
      <div
        className={styles.contactNav}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div>
          <Comment />
          <Typography sx={{ fontWeight: 600 }}>Help Center</Typography>
        </div>
        <span>
          {open ? (
            <ArrowDropUp sx={{ fontSize: 26 }} />
          ) : (
            <ArrowDropDown sx={{ fontSize: 26 }} />
          )}
        </span>
      </div>
      <Collapse in={open}>
        <div className={styles.collapse}>
          <SingleContact title="Address" icon={<IconMapPinFilled size={18} />}>
            <Typography sx={{ fontWeight: 500 }}>
              6954 Americana Pkwy reynoldsburg, Ohio 43068
            </Typography>
          </SingleContact>
          <SingleContact title="Phone" icon={<Phone fontSize="small" />}>
            <Typography sx={{ fontWeight: 500 }}>614-714-6011</Typography>
          </SingleContact>
          <SingleContact
            title="Email Address"
            icon={<IconMailFilled size={18} />}
          >
            <a href="mailto:info@axcessfoundation.org">
              <Typography sx={{ fontWeight: 500 }}>
                info@axcessfoundation.org
              </Typography>
            </a>
          </SingleContact>
          <SingleContact title="Website" icon={<IconWorld size={18} />}>
            <Link href="https://axcessfoundation.org" target="_blank">
              <Typography sx={{ fontWeight: 500 }}>
                axcessfoundation.org
              </Typography>
            </Link>
          </SingleContact>
        </div>
      </Collapse>
    </Box>
  );
}
// const SingleContact = ({
//   title,
//   icon,
//   children,
// }: {
//   title: string;
//   icon: any;
//   children: ReactNode;
// }) => {
//   return (
//     <div className={styles.singleCon}>
//       <div className={styles.conIcon}>{icon}</div>
//       <div className={styles.content}>
//         <Typography variant="h6" className={styles.conTitle}>
//           {title}
//         </Typography>
//         {children}
//       </div>
//     </div>
//   );
// };

const SingleContact = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: any;
  children: ReactNode;
}) => {
  return (
    <div className={styles.singleCon}>
      {/* <div className={styles.conIcon}></div> */}
      <div className={styles.content}>
        <Typography className={styles.conTitle}>
          {icon} {title}
        </Typography>
        {children}
      </div>
    </div>
  );
};
