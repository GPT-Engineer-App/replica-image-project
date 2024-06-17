import { useState } from "react";
import { Box, Container, Flex, Heading, IconButton, Input, InputGroup, InputLeftElement, Text, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Select, Textarea } from "@chakra-ui/react";
import { SearchIcon, HamburgerIcon, AddIcon } from "@chakra-ui/icons";
import notesIcon from "../../public/images/notes-icon.png";
import profileIcon from "../../public/images/profile-icon.png";
import { useNotes, useAddNote, useUpdateNote, useDeleteNote } from "../integrations/supabase/index.js";
import { format } from "date-fns";

const Index = () => {
  const { data: notes, error, isLoading } = useNotes();
  const addNote = useAddNote();
  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "", color: "pink" });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNote({
      ...newNote,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    await addNote.mutateAsync(newNote);
    setIsModalOpen(false);
    setNewNote({ title: "", content: "", color: "pink" });
  };

  const handleEditClick = (note) => {
    setNoteToEdit(note);
    setIsEditModalOpen(true);
  };

  const handleUpdateSubmit = async () => {
    await updateNote.mutateAsync(noteToEdit);
    setIsEditModalOpen(false);
    setNoteToEdit(null);
  };

  const handleDeleteClick = async (id) => {
    await deleteNote.mutateAsync(id);
  };

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
            <Flex justifyContent="space-between">
              <Button size="sm" onClick={() => handleEditClick(note)}>Edit</Button>
              <Button size="sm" colorScheme="red" onClick={() => handleDeleteClick(note.id)}>Delete</Button>
            </Flex>
          </Box>
        ))}
      </Flex>
      <IconButton aria-label="Add" icon={<AddIcon />} variant="solid" colorScheme="purple" position="absolute" bottom="20px" right="20px" onClick={() => setIsModalOpen(true)} />
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="title" mb={4}>
              <FormLabel>Title</FormLabel>
              <Input type="text" name="title" value={newNote.title} onChange={handleInputChange} />
            </FormControl>
            <FormControl id="content" mb={4}>
              <FormLabel>Content</FormLabel>
              <Textarea name="content" value={newNote.content} onChange={handleInputChange} />
            </FormControl>
            <FormControl id="color" mb={4}>
              <FormLabel>Color</FormLabel>
              <Select name="color" value={newNote.color} onChange={handleInputChange}>
                <option value="pink">Pink</option>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="title" mb={4}>
              <FormLabel>Title</FormLabel>
              <Input type="text" name="title" value={noteToEdit?.title || ""} onChange={(e) => setNoteToEdit({ ...noteToEdit, title: e.target.value })} />
            </FormControl>
            <FormControl id="content" mb={4}>
              <FormLabel>Content</FormLabel>
              <Textarea name="content" value={noteToEdit?.content || ""} onChange={(e) => setNoteToEdit({ ...noteToEdit, content: e.target.value })} />
            </FormControl>
            <FormControl id="color" mb={4}>
              <FormLabel>Color</FormLabel>
              <Select name="color" value={noteToEdit?.color || "pink"} onChange={(e) => setNoteToEdit({ ...noteToEdit, color: e.target.value })}>
                <option value="pink">Pink</option>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdateSubmit}>
              Save
            </Button>
            <Button variant="ghost" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;