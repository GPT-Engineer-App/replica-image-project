import { useState } from "react";
import { Box, Container, Flex, Heading, Text, VStack, Button, Menu, MenuButton, MenuList, MenuItem, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Textarea, Select, ModalFooter } from "@chakra-ui/react";
import NoteCard from "../components/NoteCard.jsx";
import { FiMoreVertical } from "react-icons/fi";
import { useNotes, useUpdateNote, useDeleteNote } from "../integrations/supabase/index.js";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";
import { format } from "date-fns";

const Pinned = () => {
  const { data: notes, error, isLoading } = useNotes();
  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();
  const { logout } = useSupabaseAuth();
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const pinnedNotes = notes.filter(note => note.pinned);

  return (
    <Container maxW="container.xl" p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={8}>
        <Heading as="h1" size="lg" color="purple.500">Pinned Notes</Heading>
        <Button onClick={logout} colorScheme="red" ml={4}>Logout</Button>
      </Flex>
      <Flex wrap="wrap" justifyContent="space-between">
        {pinnedNotes.map(note => (
          <NoteCard 
            key={note.id}
            note={note}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            onPin={handlePinClick}
          />
        ))}
      </Flex>

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

export default Pinned;