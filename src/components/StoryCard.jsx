import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import GradeIcon from "@mui/icons-material/Grade";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useGlobalContext } from "../context/useGlobalContext";
import { useNavigate } from "react-router-dom";
import { bookmarkStory } from "../services/globalServices";
import { useState } from "react";

function StoryCard({ story }) {
  const token = localStorage.getItem("token");
  const [bookmarkedStory, setBookmarkedStory] = useState([]);
  // console.log("book", bookmarkedStory);

  const navigate = useNavigate();
  const handleBookmark = async (storyId) => {
    try {
      const res = await bookmarkStory(token, storyId);
      setBookmarkedStory(res.stories);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };
  return (
    <Card sx={{ minWidth: 275 }} key={story._id}>
      <CardContent>
        <div className="mb-4">
          <p className="font-semibold">{story.title}</p>
        </div>

        <div className="flex justify-between">
          <div>
            <span className="mr-1">
              <GradeIcon className="text-sm text-yellow-400" />
            </span>
            <span> {story.points}</span>
          </div>
          <div>
            <span className="mr-1">
              <GradeIcon className="text-sm text-yellow-400" />
            </span>
            <span> {story.author}</span>
          </div>
          <div>
            <span className="mr-1">
              <GradeIcon className="text-sm text-yellow-400" />
            </span>
            <span>{story.postedAt?.split("T")[0]}</span>
          </div>
        </div>
      </CardContent>
      <div style={{ padding: "8px 16px" }}>
        <span
          size="small"
          style={{ paddingRight: "0" }}
          onClick={() => {
            if (!token) {
              navigate("/login");
              return;
            }
            handleBookmark(story._id);
          }}
        >
          {bookmarkedStory.includes(story._id) ? (
            <BookmarkIcon />
          ) : (
            <BookmarkBorderIcon />
          )}
        </span>
      </div>
    </Card>
  );
}

export default StoryCard;
