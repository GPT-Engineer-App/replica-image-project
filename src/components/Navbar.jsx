import { Box, Flex, Button, Heading, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";

const Navbar = () => {
  const { session, logout } = useSupabaseAuth();

  return (
    <Box bg="purple.500" p={4} color="white">
      <Flex maxW="container.xl" mx="auto" align="center">
        <Heading as="h1" size="lg">
          <Link to="/">Notes</Link>
        </Heading>
        <Spacer />
        <Flex align="center">
          <Button as={Link} to="/" colorScheme="purple" variant="ghost" mr={4}>
            Home
          </Button>
          <Button as={Link} to="/pinned" colorScheme="purple" variant="ghost" mr={4}>
            Pinned Notes
          </Button>
          <Button as={Link} to="/about" colorScheme="purple" variant="ghost" mr={4}>
            About Us
          </Button>
          {session ? (
            <Button onClick={logout} colorScheme="red" variant="ghost">
              Logout
            </Button>
          ) : (
            <Button as={Link} to="/login" colorScheme="purple" variant="ghost">
              Login
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;