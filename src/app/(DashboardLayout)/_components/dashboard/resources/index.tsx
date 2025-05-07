"use client";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import DashboardCard from "@/app/(DashboardLayout)/_components/shared/DashboardCard";
import { Button, Skeleton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import styles from "./style.module.css";
import { SynthesizedComment } from "typescript";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

export default function ResourceListAdv() {
  const [filter, setFilter] = useState<string>("all");
  const [res, setRes] = useState<any[]>([]);

  const [fcount, setFcount] = useState<number>(2);

  useEffect(() => {
    setTimeout(() => {
      setRes(resources);
    }, 1000);
  }, [filter]);

  const filtered = resources.filter(
    (itm) => filter === "all" || filter === itm?.category_id
  );

  const itemsPerPage = 4;
  const {
    currentPageData,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    setPage,
  } = usePagination(filtered, itemsPerPage);

  const catShow = categories.slice(0, fcount);
  const catSelect = categories.slice(fcount, categories.length);

  const selectFilterChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLSelectElement;
    const value = target?.value ?? null;
    if (value) {
      setPage(1);
      setFilter(value);
    }
  };
  return (
    <>
      <div className={styles.topSec}>
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          But wait, do you really need the loan?
        </Typography>
        <Typography variant="h4">
          Explore other free resources before considering your loan options.
        </Typography>
      </div>
      <DashboardCard
        title="Resources"
        action={
          <div className={styles.fitemWrap}>
            {catShow.map((item, index) => (
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
            <select
              className={`form-select ${styles.select}`}
              style={{ maxWidth: 200 }}
              onChange={selectFilterChange}
            >
              {catSelect.map((item, index) => (
                <option value={item?.id} key={index + "-" + item?.id}>
                  {item?.label ?? ""}
                </option>
              ))}
            </select>
          </div>
        }
      >
        <div className="container">
          <div className="row">
            {currentPageData.map((item, index) => (
              <div
                className="col-6 col-md-3 mb-"
                key={item?.link + " " + index}
              >
                <SingleResource data={item} />
              </div>
            ))}
          </div>
          {filtered.length > itemsPerPage && (
            <div className={styles.arrowsWrap}>
              <div
                className={styles.arrow}
                style={{ opacity: currentPage === 1 ? 0.75 : 1 }}
                onClick={() => {
                  prevPage();
                }}
              >
                <IconChevronLeft size={18} />
              </div>
              <div
                className={styles.arrow}
                onClick={() => {
                  nextPage();
                }}
              >
                <IconChevronRight size={18} />
              </div>
            </div>
          )}
        </div>
      </DashboardCard>
    </>
  );
}

const SingleResource = ({ data }: any) => {
  return (
    <div className={styles.singleRes}>
      <div className={styles.imgWrap}>
        <img
          src={data?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null}
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
          {/* <button className="btn btn-primary mt-3">Read More</button> */}
          <Button variant="contained" className="mt-3">
            Read More
          </Button>
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
  {
    title: "Children’s Hea Insurance Program (CHIP)",
    link: "https://www.insuekidsnow.gov/",
    image: null,
    category_id: "3",
    excerpt:
      "Provides ow-cost health insurance to children in low-income families who do not qualify for Medicaid.",
  },
];

const categories = [
  { id: "all", label: "All" },
  { id: "1", label: "Food" },
  { id: "2", label: "Housing & Utilities" },
  { id: "3", label: "Child & Family Care" },
  { id: "4", label: "Healthcare" },
];

function usePagination<T>(data: T[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get current page's data
  const currentPageData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Go to next page
  const nextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  // Go to previous page
  const prevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  // Set a specific page
  const setPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    currentPageData,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    setPage,
  };
}
