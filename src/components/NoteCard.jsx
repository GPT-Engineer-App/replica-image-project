import { Box, Heading, Text, Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { FiMoreVertical } from "react-icons/fi";
import { format } from "date-fns";

const NoteCard = ({ note, onEdit, onDelete, onPin }) => {
  return (
    <Box key={note.id} bg={`${note.color}.50`} p={4} borderRadius="md" width="30%" mb={4} position="relative" display="flex" flexDirection="column" justifyContent="space-between">
      <Menu>
        <MenuButton as={IconButton} icon={<FiMoreVertical />} variant="ghost" position="absolute" top="0" right="0" />
        <MenuList>
          <MenuItem onClick={() => onEdit(note)}>Edit</MenuItem>
          <MenuItem onClick={() => onDelete(note.id)}>Delete</MenuItem>
          <MenuItem onClick={() => onPin(note)}>
            {note.pinned ? "Unpin" : "Pin"}
          </MenuItem>
        </MenuList>
      </Menu>
      <Heading as="h3" size="md" mb={2}>{note.title}</Heading>
      <Text mb={4} whiteSpace="pre-wrap">{note.content}</Text>
      <Text fontSize="sm" color="gray.500" mt="auto">created at {format(new Date(note.created_at), 'MMMM d, yyyy h:mm a')}</Text>
    </Box>
  );
};

export default NoteCard;