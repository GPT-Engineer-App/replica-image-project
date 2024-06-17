import { Box, Container, Flex, Heading, IconButton, Input, InputGroup, InputLeftElement, Text, VStack } from "@chakra-ui/react";
import { SearchIcon, HamburgerIcon, AddIcon } from "@chakra-ui/icons";
import notesIcon from "../../public/images/notes-icon.png";
import profileIcon from "../../public/images/profile-icon.png";
import icon3d from "../../public/images/3d-icon.png";

const Index = () => {
  return (
    <Container maxW="container.xl" p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={8}>
        <Flex alignItems="center">
          <img src={notesIcon} alt="Notes Icon" style={{ width: "50px", marginRight: "10px" }} />
          <Heading as="h1" size="lg" color="purple.500">Notes</Heading>
        </Flex>
        <Flex alignItems="center">
          <Text mr={4}>Puneet Shakya</Text>
          <img src={profileIcon} alt="Profile Icon" style={{ width: "40px", borderRadius: "50%" }} />
          <IconButton aria-label="Menu" icon={<HamburgerIcon />} variant="ghost" ml={4} />
        </Flex>
      </Flex>
      <InputGroup mb={8}>
        <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
        <Input type="text" placeholder="Search notes" />
      </InputGroup>
      <Flex wrap="wrap" justifyContent="space-between">
        <Box bg="green.50" p={4} borderRadius="md" width="30%" mb={4}>
          <Heading as="h3" size="md" mb={2}>lorem ipsum</Heading>
          <Text mb={4}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a tristique augue, ut egestas velit. Mauris condimentum sed ante at sagittis. Suspendisse vitae lacinia purus. Donec a tristique augue, ut egestas velit.</Text>
          <Text fontSize="sm" color="gray.500">last opened yesterday 16:03</Text>
        </Box>
        <Box bg="pink.50" p={4} borderRadius="md" width="30%" mb={4}>
          <Heading as="h3" size="md" mb={2}>lorem ipsum</Heading>
          <Text mb={4}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a tristique augue, ut egestas velit.</Text>
          <Text fontSize="sm" color="gray.500">last opened yesterday 9:03</Text>
        </Box>
        <Box bg="yellow.50" p={4} borderRadius="md" width="30%" mb={4} position="relative">
          <Heading as="h3" size="md" mb={2}>lorem ipsum</Heading>
          <Text mb={4}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a tristique augue, ut egestas velit. Sed venenatis, nunc ut fermentum interdum, quam eros sollicitudin enim, eu porttitor risus enim ut felis. Nunc tellus libero, fringilla eu commodo sit amet, maximus a mauris. Mauris aliquam.</Text>
          <Text fontSize="sm" color="gray.500">last opened august 20</Text>
          <IconButton aria-label="Add" icon={<AddIcon />} variant="solid" colorScheme="purple" position="absolute" bottom="4" right="4" />
        </Box>
        <Box bg="green.50" p={4} borderRadius="md" width="30%" mb={4}>
          <Heading as="h3" size="md" mb={2}>lorem ipsum</Heading>
          <Text mb={4}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a tristique augue, ut egestas velit.</Text>
          <Text fontSize="sm" color="gray.500">last opened friday</Text>
        </Box>
      </Flex>
      <img src={icon3d} alt="3D Icon" style={{ position: "absolute", bottom: "20px", right: "20px", width: "100px" }} />
    </Container>
  );
};

export default Index;