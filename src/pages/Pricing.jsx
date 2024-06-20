import { Box, Container, Heading, Text, VStack, SimpleGrid, Button } from "@chakra-ui/react";

const Pricing = () => {
  const tiers = [
    {
      title: "Basic",
      price: "$0",
      description: "This is a basic plan with limited features.",
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
      title: "Standard",
      price: "$10",
      description: "This is a standard plan with more features.",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
    },
    {
      title: "Premium",
      price: "$20",
      description: "This is a premium plan with all features.",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
    },
    {
      title: "Enterprise",
      price: "Contact Us",
      description: "This is an enterprise plan with custom features.",
      features: ["Custom Feature 1", "Custom Feature 2", "Custom Feature 3", "Custom Feature 4", "Custom Feature 5"],
    },
  ];

  return (
    <Container maxW="container.xl" p={4}>
      <VStack spacing={4} align="center">
        <Heading as="h1" size="xl" color="purple.500">Enterprise Pricing</Heading>
        <Text fontSize="lg" textAlign="center">
          Choose the plan that best suits your enterprise needs.
        </Text>
      </VStack>
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10} mt={8}>
        {tiers.map((tier, index) => (
          <Box key={index} p={5} shadow="md" borderWidth="1px" borderRadius="md">
            <Heading as="h2" size="lg" mb={4}>{tier.title}</Heading>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>{tier.price}</Text>
            <Text mb={4}>{tier.description}</Text>
            <VStack spacing={2} align="start">
              {tier.features.map((feature, idx) => (
                <Text key={idx}>- {feature}</Text>
              ))}
            </VStack>
            <Button colorScheme="purple" mt={4}>Select</Button>
          </Box>
        ))}
      </SimpleGrid>
      <Box mt={8} textAlign="center">
        <Heading as="h2" size="lg" mb={4}>Contact Sales</Heading>
        <Text fontSize="lg" mb={4}>For enterprise sales inquiries, please contact us at:</Text>
        <Text fontSize="lg" fontWeight="bold" mb={4}>sales@example.com</Text>
        <Button colorScheme="purple" size="lg">Get in Touch</Button>
      </Box>
    </Container>
  );
};

export default Pricing;