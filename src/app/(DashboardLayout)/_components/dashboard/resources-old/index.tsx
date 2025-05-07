"use client";
import React, { useEffect, useRef, useState } from "react";
import DashboardCard from "@/app/(DashboardLayout)/_components/shared/DashboardCard";
import { Skeleton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import styles from "./style.module.css";
import { IconCalendarEvent } from "@tabler/icons-react";
import axios from "axios";
import moment from "moment";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const settings = {
  dots: false,
  arrows: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
  //variableWidth: false,
};
export default function ResourceList() {
  const [filter, setFilter] = useState<string>("all");
  const refDiv = useRef(null);

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      <DashboardCard
        title="Resources"
        action={
          <div className={styles.fitemWrap}>
            {categories.map((item, index) => (
              <div
                className={`${styles.filterItem} ${
                  filter === item?.id ? styles.activeItem : ""
                }`}
                key={index + " " + item?.id}
                onClick={() => {
                  setFilter(item?.id ?? "all");
                }}
              >
                <Typography sx={{ fontWeight: 500 }}>
                  {item?.label ?? ""}
                </Typography>
              </div>
            ))}
          </div>
        }
      >
        <>
          <div
            style={{
              position: "relative",
              width: "100%",
              overflow: "hidden",
              //maxWidth: refDiv?.current?.clientWidth ?? "100%",
              maxWidth: "100%",
              //display: "block",
              //margin: "0 auto",
            }}
          >
            {!loading && (
              <Slider {...settings} adaptiveHeight>
                {resources
                  .filter(
                    (itm) => filter === "all" || filter === itm?.category_id
                  )
                  .map((item, index) => (
                    <div className="px-2" key={item?.link + " " + index}>
                      <SingleResource data={item} />
                    </div>
                  ))}
              </Slider>
            )}
          </div>
        </>
      </DashboardCard>
    </>
  );
}

const SingleResource = ({ data }: any) => {
  return (
    <div className={styles.singleRes}>
      <div className={styles.imgWrap}>
        <img
          src={data?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? ""}
          className={styles.thumbnail}
        />
      </div>
      <div className={styles.content}>
        <Typography variant="h6" className="my-3">
          {data?.title ?? ""}
        </Typography>
        <Typography variant="body1" color="grey.500" sx={{ fontWeight: 500 }}>
          {data?.excerpt ?? ""}
        </Typography>
        <a href={data?.link ?? "#"} target="_blank">
          <button className="btn btn-primary mt-3">Read More</button>
        </a>
      </div>
    </div>
  );
};

const resources = [
  {
    title: "The Emergency Food Assistance Program (TEFAP)",
    link: "https://www.fns.usda.gov/fdd/programs/tefap/",
    image: null,
    category_id: "1",
    excerpt:
      "Provides free emergency food assistance to low-income individuals and families through local food banks and pantries.",
  },
  {
    title: "Supplemental Nutrition Assistance Program (SNAP)",
    link: "https://www.fns.usda.gov/snap",
    image: null,
    category_id: "1",
    excerpt:
      "A federal program that provides nutrition benefits to eligible low-income individuals and families to help buy food.",
  },
  {
    title: "Home Energy Assistance Program (HEAP)",
    link: "https://development.ohio.gov/is/is_heap.htm",
    image: null,
    category_id: "2",
    excerpt:
      "Helps low-income households pay for heating and cooling costs by providing financial assistance on energy bills.",
  },
  {
    title: "Low-Income Home Energy Assistance Program (LIHEAP)",
    link: "https://www.acf.hhs.gov/ocs/programs/liheap",
    image: null,
    category_id: "2",
    excerpt:
      "A federal program that provides financial assistance to low-income households to manage energy costs and prevent disconnections.",
  },
  {
    title: "Ohio Child Care Resource & Referral Association (OCCRRA)",
    link: "https://www.occrra.org/",
    image: null,
    category_id: "3",
    excerpt:
      "Supports families in finding affordable, high-quality child care options and resources throughout Ohio.",
  },
  {
    title: "Ohio Department of Job & Family Services",
    link: "http://jfs.ohio.gov/",
    image: null,
    category_id: "3",
    excerpt:
      "Provides assistance with child care, employment services, cash assistance, and other family support programs.",
  },
  {
    title: "Ohio Medicaid",
    link: "https://medicaid.ohio.gov/",
    image: null,
    category_id: "4",
    excerpt:
      "Offers free or low-cost health coverage for eligible low-income individuals, families, seniors, and people with disabilities.",
  },
  {
    title: "Children’s Health Insurance Program (CHIP)",
    link: "https://www.insurekidsnow.gov/",
    image: null,
    category_id: "4",
    excerpt:
      "Provides low-cost health insurance to children in low-income families who do not qualify for Medicaid.",
  },
];

const categories = [
  { id: "all", label: "All" },
  { id: "1", label: "Food" },
  { id: "2", label: "Housing & Utilities" },
  { id: "3", label: "Child & Family Care" },
  { id: "4", label: "Healthcare" },
];
