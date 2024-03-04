import { BlogContext } from "../context/BlogContext";
import { useContext } from "react";

export const useBlogsContext = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error(
      "useBlogsContext must be used within a BlogContextProvider"
    );
  }

  return context;
};
