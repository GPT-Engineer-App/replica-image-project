import { useState } from "react";
import { Box, Container, Heading, FormControl, FormLabel, Input, Textarea, Button, VStack } from "@chakra-ui/react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={4} align="center">
        <Heading as="h1" size="xl" color="purple.500">Contact Us</Heading>
        <Box as="form" width="100%" onSubmit={handleSubmit}>
          <FormControl id="name" mb={4}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </FormControl>
          <FormControl id="email" mb={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </FormControl>
          <FormControl id="message" mb={4}>
            <FormLabel>Message</FormLabel>
            <Textarea name="message" value={formData.message} onChange={handleChange} required />
          </FormControl>
          <Button type="submit" colorScheme="purple" width="100%">Submit</Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default Contact;