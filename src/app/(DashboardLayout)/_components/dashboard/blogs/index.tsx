"use client";
import React, { useEffect, useState } from "react";
import DashboardCard from "@/app/(DashboardLayout)/_components/shared/DashboardCard";
import { Skeleton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import styles from "./style.module.css";
import { IconCalendarEvent } from "@tabler/icons-react";
import axios from "axios";
import moment from "moment";

export default function BlogList() {
  const [loading, setLoading] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const resp = await axios.get(
          "https://axcessfoundation.org/wp-json/wp/v2/posts",
          {
            params: {
              _fields:
                "id,title,link,featured_media,modified,_links.wp:featuredmedia,_embedded",
              _embed: "wp:featuredmedia",
            },
          }
        );
        const resData = resp?.data ?? [];
        setBlogs(resData);
      } catch (e) {
        //console.log(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <DashboardCard title="Blogs">
      <Box>
        {loading && (
          <div className="row">
            {[1, 2, 3].map((item, index) => (
              <div className="col-md-4" key={item + " " + index}>
                <Skeleton
                  variant="rectangular"
                  height={200}
                  sx={{ borderRadius: "12px" }}
                />
                <Skeleton className="mt-3" width={200} height={36} />
                <Skeleton width={120} />
              </div>
            ))}
          </div>
        )}
        {!loading && blogs?.length > 0 && (
          <div className="row">
            {blogs.map((item, index) => (
              <div className="col-md-4 mb-3" key={item?.link + " " + index}>
                <SingleBlog data={item} />
              </div>
            ))}
          </div>
        )}
        {!loading && blogs?.length === 0 && (
          <div className="p-3 bg-light">
            <Typography>
              It looks like there are no blog posts available at the moment.
              Check back later.
            </Typography>
          </div>
        )}
      </Box>
    </DashboardCard>
  );
}

const SingleBlog = ({ data }: any) => {
  return (
    <div className={styles.singleBlog}>
      <div className="thumbnail">
        <img
          src={data?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null}
          className={styles.thumbnail}
        />
      </div>
      <div className={styles.content}>
        <a href={data?.link ?? "#"} target="_blank" rel="noopener noreferrer">
          <Typography variant="h6">{data?.title?.rendered ?? ""}</Typography>
        </a>
        <div className={styles.date}>
          <IconCalendarEvent color="#777" size={20} />
          <Typography variant="body2" color="grey.400" sx={{ fontWeight: 500 }}>
            {moment(data?.modified ?? new Date()).format("DD MMM, YYYY")}
          </Typography>
        </div>
      </div>
    </div>
  );
};
