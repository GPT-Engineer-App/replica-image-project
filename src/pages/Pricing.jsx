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
  ];

  return (
    <Container maxW="container.xl" p={4}>
      <VStack spacing={4} align="center">
        <Heading as="h1" size="xl" color="purple.500">Pricing</Heading>
        <Text fontSize="lg" textAlign="center">
          Choose the plan that best suits your needs.
        </Text>
      </VStack>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mt={8}>
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
    </Container>
  );
};

export default Pricing;