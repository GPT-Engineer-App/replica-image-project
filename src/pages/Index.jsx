import { Box, Container, Flex, Heading, IconButton, Input, InputGroup, InputLeftElement, Text, VStack } from "@chakra-ui/react";
import { SearchIcon, HamburgerIcon, AddIcon } from "@chakra-ui/icons";
import notesIcon from "../../public/images/notes-icon.png";
import profileIcon from "../../public/images/profile-icon.png";
import { useNotes } from "../integrations/supabase/index.js";
import { format } from "date-fns";

const Index = () => {
  const { data: notes, error, isLoading } = useNotes();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
        {notes.map(note => (
          <Box key={note.id} bg={`${note.color}.50`} p={4} borderRadius="md" width="30%" mb={4}>
            <Heading as="h3" size="md" mb={2}>{note.title}</Heading>
            <Text mb={4} whiteSpace="pre-wrap">{note.content}</Text>
            <Text fontSize="sm" color="gray.500">created at {format(new Date(note.created_at), 'MMMM d, yyyy h:mm a')}</Text>
          </Box>
        ))}
      </Flex>
      <IconButton aria-label="Add" icon={<AddIcon />} variant="solid" colorScheme="purple" position="absolute" bottom="20px" right="20px" />
    </Container>
  );
};

export default Index;