import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Owner'];
  const roles = ['Customer', 'Owner', 'Manager', 'Chef', 'Waitstaff'];
  const applicationName = 'My SaaS application';
  const tenantName = 'Restaurant';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `1. As an Owner, I want to create a new Restaurant, so that I can manage my restaurant using the software.
2. As an Owner, I want to invite Managers, Chefs, and Waitstaff to join my Restaurant, so that they can use the software to manage their respective tasks.
3. As an Owner, I want to edit and update my Restaurant's information, so that I can keep the information accurate and up-to-date.

4. As a Manager, I want to view the list of all Chefs and Waitstaff in my Restaurant, so that I can manage and assign tasks to them.
5. As a Manager, I want to create and update the menu items, so that I can keep the menu up-to-date and accurate.
6. As a Manager, I want to manage table reservations, so that I can ensure a smooth dining experience for customers.

7. As a Chef, I want to view the list of menu items, so that I can prepare the dishes accordingly.
8. As a Chef, I want to update the status of menu items (e.g., out of stock), so that the Waitstaff and Customers are aware of the availability.

9. As Waitstaff, I want to view the list of tables and their reservation status, so that I can manage seating and serve customers efficiently.
10. As Waitstaff, I want to create and update customer orders, so that I can ensure accurate and timely service.

11. As a Customer, I want to view the menu of a Restaurant, so that I can decide what to order.
12. As a Customer, I want to make a table reservation, so that I can secure a table for my dining experience.
13. As a Customer, I want to place an order for my chosen menu items, so that I can enjoy my meal at the Restaurant.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="30px" bottom="20px" zIndex={3}>
      <Popover placement="top-end">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent w="50vw" h="70vh">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
