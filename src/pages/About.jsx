import { Box, Container, Heading, Text, Image, VStack } from "@chakra-ui/react";
import catImage from "../../public/images/cat-image.png";

const About = () => {
  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={4} align="center">
        <Heading as="h1" size="xl" color="purple.500">About Us</Heading>
        <Text fontSize="lg" textAlign="center">
          Hello! I'm a passionate developer who loves creating web applications. In my free time, I enjoy spending time with my cats.
        </Text>
        <Image src={catImage} alt="A cute cat" borderRadius="md" />
      </VStack>
    </Container>
  );
};

export default About;