"use client";
import React from "react";
import { Collapse } from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)/_components/shared/DashboardCard";
import { Typography } from "@mui/material";
import { useState } from "react";
import styles from "./style.module.css";
import {
  IconChevronDown,
  IconChevronUp,
  IconHeartHandshake,
  IconHelp,
  IconMoneybag,
  IconReceipt,
  IconStar,
} from "@tabler/icons-react";

export default function FaqList() {
  return (
    <DashboardCard
      title="Frequently asked Questions"
      subtitle="Find answers to common questions about our mission, programs, and how you can get involved."
    >
      <div>
        {faqData?.map((item, index) => (
          <div className={styles.singleFaq} key={item?.title + " " + index}>
            <div className={styles.icon}>{item?.icon ?? ""}</div>
            <div style={{ flexGrow: 1 }}>
              <MyAccordion data={item} />
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}

const MyAccordion = ({
  data,
}: {
  data: { title: string; text: string; icon: any };
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <div
        className={styles.titleWrap}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <Typography variant="h6" style={{ flex: 1 }}>
          {data?.title ?? ""}
        </Typography>
        <div className={styles.cvIcon}>
          {open ? (
            <IconChevronUp size={18} color="#666" />
          ) : (
            <IconChevronDown size={18} color="#666" />
          )}
        </div>
      </div>
      <Collapse in={open}>
        <Typography color="#575757">{data?.text ?? ""}</Typography>
      </Collapse>
    </>
  );
};

const faqData = [
  {
    title: "What is the mission of Axcess Foundation?",
    text: "Axcess Foundation aims to provide support and resources to underprivileged communities, focusing on education, healthcare, and sustainable development.",
    icon: <IconHeartHandshake size={18} color="#666" />,
  },
  {
    title: "How can I get involved with Axcess Foundation?",
    text: "You can get involved by volunteering your time, donating funds or resources, and participating in our various programs and events. Visit our 'Get Involved' page for more information.",
    icon: <IconStar size={18} color="#666" />,
  },
  {
    title: "Where does Axcess Foundation operate?",
    text: "We operate in various regions across the globe, with a focus on areas that lack access to essential services. Our projects are tailored to the specific needs of each community.",
    icon: <IconMoneybag size={18} color="#666" />,
  },
  {
    title: "How are donations utilized?",
    text: "Donations are allocated to our programs, including educational initiatives, healthcare services, and sustainable development projects. We ensure that funds are used effectively to maximize impact.",
    icon: <IconHelp size={18} color="#666" />,
  },
  {
    title: "Is my donation tax-deductible?",
    text: "Yes, Axcess Foundation is a registered non-profit organization, and donations are tax-deductible to the extent permitted by law. Please consult with your tax advisor for specific guidance.",
    icon: <IconReceipt size={18} color="#666" />,
  },
];
