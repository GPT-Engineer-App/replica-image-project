import { useState } from "react";
import { Box, Container, Flex, Heading, Text, VStack, Button, Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
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
          <Box key={note.id} bg={`${note.color}.50`} p={4} borderRadius="md" width="30%" mb={4}>
            <Heading as="h3" size="md" mb={2}>{note.title}</Heading>
            <Text mb={4} whiteSpace="pre-wrap">{note.content}</Text>
            <Text fontSize="sm" color="gray.500">created at {format(new Date(note.created_at), 'MMMM d, yyyy h:mm a')}</Text>
            <Flex justifyContent="space-between">
              <Menu>
                <MenuButton as={IconButton} icon={<FiMoreVertical />} variant="ghost" />
                <MenuList>
                  <MenuItem onClick={() => handlePinClick(note)}>
                    {note.pinned ? "Unpin" : "Pin"}
                  </MenuItem>
                  <MenuItem onClick={() => handleDeleteClick(note.id)}>Delete</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Box>
        ))}
      </Flex>
    </Container>
  );
};

export default Pinned;