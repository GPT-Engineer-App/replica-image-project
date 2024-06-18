import { useState } from "react";
import { Box, Container, Flex, Heading, Text, VStack, Button, Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const pinnedNotes = notes.filter(note => note.pinned);

  const handlePinClick = async (note) => {
    await updateNote.mutateAsync({ ...note, pinned: !note.pinned });
  };

  const handleDeleteClick = async (id) => {
    await deleteNote.mutateAsync(id);
  };

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
    </Container>
  );
};

export default Pinned;