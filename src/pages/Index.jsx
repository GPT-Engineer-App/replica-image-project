import { useState } from "react";
import { Box, Container, Flex, Heading, IconButton, Input, InputGroup, InputLeftElement, Text, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Select, Textarea, Avatar } from "@chakra-ui/react";
import { SearchIcon, AddIcon } from "@chakra-ui/icons";
import { useNotes, useAddNote, useUpdateNote, useDeleteNote } from "../integrations/supabase/index.js";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";
import { format } from "date-fns";
import { FaHome, FaStickyNote, FaBookmark } from "react-icons/fa";

const Index = () => {
  const { data: notes, error, isLoading } = useNotes();
  const addNote = useAddNote();
  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();
  const { logout } = useSupabaseAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "", color: "pink" });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNote({
      ...newNote,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    await addNote.mutateAsync({ ...newNote, pinned: false });
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

  const handlePinClick = async (note) => {
    await updateNote.mutateAsync({ ...note, pinned: !note.pinned });
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Flex>
      <Box w="20%" bg="gray.100" p={4}>
        <Flex direction="column" align="center" mb={8}>
          <Avatar size="xl" mb={4} />
          <InputGroup mb={4}>
            <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
            <Input type="text" placeholder="Search notes" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </InputGroup>
          <IconButton aria-label="Home" icon={<FaHome />} variant="ghost" mb={4} />
          <IconButton aria-label="Notes" icon={<FaStickyNote />} variant="ghost" mb={4} />
          <IconButton aria-label="Bookmarks" icon={<FaBookmark />} variant="ghost" mb={4} />
        </Flex>
        <Heading as="h3" size="md" mb={4}>My Notes</Heading>
        <VStack spacing={4}>
          {filteredNotes.map(note => (
            <Box key={note.id} bg={`${note.color}.50`} p={4} borderRadius="md" width="100%" onClick={() => handleNoteClick(note)}>
              <Heading as="h4" size="sm" mb={2}>{note.title}</Heading>
              <Text noOfLines={2}>{note.content}</Text>
              <Text fontSize="xs" color="gray.500">{format(new Date(note.created_at), 'MMMM d, yyyy h:mm a')}</Text>
            </Box>
          ))}
        </VStack>
      </Box>
      <Box w="80%" p={4}>
        {selectedNote ? (
          <Box>
            <Heading as="h2" size="lg" mb={4}>{selectedNote.title}</Heading>
            <Text mb={4}>{selectedNote.content}</Text>
            <Text fontSize="sm" color="gray.500">{format(new Date(selectedNote.created_at), 'MMMM d, yyyy h:mm a')}</Text>
          </Box>
        ) : (
          <Text>Select a note to view its details</Text>
        )}
      </Box>
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
    </Flex>
  );
};

export default Index;