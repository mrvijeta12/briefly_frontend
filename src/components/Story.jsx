import React, { useEffect, useState } from "react";
import StoryCard from "./StoryCard";
import { getStoriesService } from "../services/globalServices";
import { useSearchParams } from "react-router-dom";

const Story = () => {
  useEffect(() => {
    document.title = "Briefly | Stories";
  });
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  useEffect(() => {
    if (!searchParams.get("page") || !searchParams.get("limit")) {
      setSearchParams({
        page: "1",
        limit: "10",
      });
      {
        replace: true;
      }
    }
  }, []);
  // FETCH STORIES
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!hasMore) return;
        setLoading(true);
        const res = await getStoriesService(page, limit);
        // console.log("res", res);
        setStories(res.stories);

        if (!res.pagination.hasMore) {
          setHasMore(false);
        }
      } catch (error) {
        console.log("get story error:", error.message);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    setSearchParams({
      page,
      limit,
    });
  }, [page]);

  //  LOAD MORE BUTTON
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setSearchParams({
        page: String(page + 1),
        limit: String(limit),
      });
    }
  };

  return (
    <div className=" mt-5 p-5">
      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stories.map((story) => (
          <StoryCard key={story._id} story={story} />
        ))}
      </div>

      {/* LOAD MORE BUTTON */}
      <div className="flex justify-center mt-6">
        {hasMore ? (
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-5 py-2 rounded-md bg-[#1976d2] hover:bg-[#539ce4] font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        ) : (
          <p className="text-gray-500 font-semibold">No more stories</p>
        )}
      </div>
    </div>
  );
};

export default Story;
