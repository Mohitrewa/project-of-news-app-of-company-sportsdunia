import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";

interface Props { }

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  source: { name: string };
  author: string;
}

const Home = ({ }: Props) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const API_KEY = "16ab320535ee41d2abfc15f00bce009f";

  // Fetch news articles from News API
  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${API_KEY}`
      );
      const data = await response.json();
      setArticles(data.articles || []);
      setFilteredArticles(data.articles || []);
    } catch (error) {
      console.error("Failed to fetch news articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    // Filter articles based on title or author
    const filtered = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(term) ||
        (article.author && article.author.toLowerCase().includes(term))
    );
    setFilteredArticles(filtered);
  };

  return (
    <Box p={3}>
      {/* Dashboard Header */}


      {/* Search Bar */}
      <Box mb={4} textAlign="center">
        <TextField
          label="Search Articles"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by title or author"
        />
      </Box>

      {/* Loading Indicator */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {/* Display Articles */}
          {filteredArticles.map((article, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: "100%" }}>
                {/* Article Image */}
                <CardMedia
                  component="img"
                  height="140"
                  image={article.urlToImage || "https://via.placeholder.com/400"}
                  alt={article.title}
                />
                {/* Article Content */}
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {article.description?.substring(0, 100) || "No description available..."}
                  </Typography>
                  <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
                    Author: {article.author || "Unknown"}
                  </Typography>
                  <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
                    Source: {article.source.name}
                  </Typography>
                  {/* Read More Button */}
                  <Button
                    variant="outlined"
                    color="primary"
                    href={article.url}
                    target="_blank"
                    sx={{ mt: 2 }}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Home;
