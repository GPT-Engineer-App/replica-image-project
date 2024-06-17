import { useState } from "react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { FiMoreVertical } from "react-icons/fi";
import { Box, Container, Flex, Heading, IconButton, Input, InputGroup, InputLeftElement, Text, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Select, Textarea } from "@chakra-ui/react";
import { SearchIcon, HamburgerIcon, AddIcon } from "@chakra-ui/icons";
import notesIcon from "../../public/images/notes-icon.png";
import profileIcon from "../../public/images/profile-icon.png";
import { useNotes, useAddNote, useUpdateNote, useDeleteNote } from "../integrations/supabase/index.js";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";
import { format } from "date-fns";

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
  const [pinnedNotes, setPinnedNotes] = useState([]);

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
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <img src={notesIcon} alt="Notes Icon" className="w-12 mr-2" />
          <h1 className="text-3xl font-bold text-purple-500">Notes</h1>
        </div>
        <div className="flex items-center">
          <a href="/pinned" className="btn btn-purple ml-4">Pinned Notes</a>
          <button onClick={logout} className="btn btn-red ml-4">Logout</button>
          <img src={profileIcon} alt="Profile Icon" className="w-10 rounded-full ml-4" />
          <button className="btn btn-ghost ml-4">
            <HamburgerIcon />
          </button>
        </div>
      </div>
      <div className="mb-8">
        <div className="relative">
          <input type="text" placeholder="Search notes" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input input-bordered w-full pl-10" />
          <SearchIcon className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>
      <div className="flex flex-wrap justify-between">
        {filteredNotes.map(note => (
          <div key={note.id} className={`bg-${note.color}-50 p-4 rounded-md w-1/3 mb-4 relative flex flex-col justify-between`}>
            <Menu>
              <MenuButton as={IconButton} icon={<FiMoreVertical />} variant="ghost" className="absolute top-0 right-0" />
              <MenuList>
                <MenuItem onClick={() => handleEditClick(note)}>Edit</MenuItem>
                <MenuItem onClick={() => handleDeleteClick(note.id)}>Delete</MenuItem>
                <MenuItem onClick={() => handlePinClick(note)}>
                  {note.pinned ? "Unpin" : "Pin"}
                </MenuItem>
              </MenuList>
            </Menu>
            <h3 className="text-xl font-bold mb-2">{note.title}</h3>
            <p className="mb-4 whitespace-pre-wrap">{note.content}</p>
            <p className="text-sm text-gray-500 mt-auto">created at {format(new Date(note.created_at), 'MMMM d, yyyy h:mm a')}</p>
          </div>
        ))}
      </div>
      <button className="btn btn-purple fixed bottom-5 right-5" onClick={() => setIsModalOpen(true)}>
        <AddIcon />
      </button>
      
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
    </div>
  );
};

export default Index;