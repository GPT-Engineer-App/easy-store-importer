import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Image, Grid, Button, Input, Textarea, useToast } from "@chakra-ui/react";
import { FaShoppingCart, FaSearch, FaBlog, FaCog } from "react-icons/fa";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const toast = useToast();

  useEffect(() => {
    // Simulate fetching products from API
    const fetchProducts = async () => {
      const response = await fetch("https://api.example.com/products");
      const data = await response.json();
      setProducts(data);
    };

    // Simulate fetching blog posts from API
    const fetchBlogPosts = async () => {
      const response = await fetch("https://api.example.com/blog-posts");
      const data = await response.json();
      setBlogPosts(data);
    };

    fetchProducts();
    fetchBlogPosts();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
    toast({
      title: "Added to cart",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleSearch = () => {
    // Perform search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <Box>
      {/* Header */}
      <Box bg="gray.100" p={4} display="flex" justifyContent="space-between">
        <Heading as="h1" size="xl">
          Clothing Brand
        </Heading>
        <Box display="flex" alignItems="center">
          <Input placeholder="Search products..." mr={2} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <Button leftIcon={<FaSearch />} onClick={handleSearch}>
            Search
          </Button>
          <Button leftIcon={<FaShoppingCart />} ml={4}>
            Cart ({cart.length})
          </Button>
        </Box>
      </Box>

      {/* Products */}
      <Box p={4}>
        <Heading as="h2" size="lg" mb={4}>
          Products
        </Heading>
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          {products.map((product) => (
            <Box key={product.id} borderWidth={1} borderRadius="md" p={4}>
              <Image src={product.image} alt={product.name} mb={2} />
              <Heading as="h3" size="md">
                {product.name}
              </Heading>
              <Text mb={2}>{product.description}</Text>
              <Text fontWeight="bold">${product.price}</Text>
              <Button mt={2} onClick={() => addToCart(product)}>
                Add to Cart
              </Button>
            </Box>
          ))}
        </Grid>
      </Box>

      {/* Blog */}
      <Box p={4}>
        <Heading as="h2" size="lg" mb={4}>
          Blog
        </Heading>
        {blogPosts.map((post) => (
          <Box key={post.id} mb={4}>
            <Heading as="h3" size="md">
              {post.title}
            </Heading>
            <Text>{post.content}</Text>
          </Box>
        ))}
      </Box>

      {/* CMS Panel */}
      <Box p={4}>
        <Heading as="h2" size="lg" mb={4}>
          CMS Panel
        </Heading>
        <Box mb={4}>
          <Heading as="h3" size="md" mb={2}>
            Add Product
          </Heading>
          <Input placeholder="Product Name" mb={2} />
          <Textarea placeholder="Product Description" mb={2} />
          <Input placeholder="Product Price" mb={2} />
          <Button>Add Product</Button>
        </Box>
        <Box>
          <Heading as="h3" size="md" mb={2}>
            Add Blog Post
          </Heading>
          <Input placeholder="Post Title" mb={2} />
          <Textarea placeholder="Post Content" mb={2} />
          <Button>Add Post</Button>
        </Box>
      </Box>

      {/* Footer */}
      <Box bg="gray.100" p={4} textAlign="center">
        <Text>&copy; 2023 Clothing Brand. All rights reserved.</Text>
      </Box>
    </Box>
  );
};

export default Index;
