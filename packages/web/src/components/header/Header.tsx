import React, { useState } from 'react';
import styled from 'styled-components';
import { color, fontSize, fontWeight, display } from 'styled-system';
import { Flex, Box } from 'rebass/styled-components';
import { Link } from '@workshop/route';
import { FaBell, FaBars, FaTimes } from 'react-icons/fa';
import {Button as DefaultButton} from 'rebass/styled-components';
import {  DialogDisclosure } from "reakit/Dialog";

import PageContainer from '../../ui/PageContainer';
import Button from '../../ui/Button';

interface MenuItemProps {
  color: string[];
  fontSize: string;
  fontWeight: string;
  menuOpen: Boolean;
}

interface NavBarProps{
  role: string;
  id: string;
  open: Boolean;
}

const MenuItem = styled(Link) <MenuItemProps>`
  ${color}
  ${fontSize}
  ${fontWeight}
  padding-right: 25px;
  text-decoration: none;

  &:hover{
    text-decoration: underline;
  }

  @media only screen and (max-width: ${({theme}) => theme.breakpoints[0]}){
    &:hover{
      color: ${({theme}) => theme.colors.accent};
    }

    &:not(:last-child){
      margin-bottom: 15px;
    }
  }
`;

const Notifications = styled(FaBell)`
  ${color}
  ${fontSize}
`

const Hamburger = styled(FaBars)`
  ${color}
  ${fontSize}
  ${display}
`;

const NavBar = styled.nav<NavBarProps>`
  ${display}

  @media only screen and (max-width: ${({theme}) => theme.breakpoints[0]}){
    position: fixed;
    display: flex;
    flex-flow: column;
    background: #fff;
    height: 100vh;
    top: 0;
    left: 0;
    padding: 35px;
    z-index: 150;
    width: 75%;
    transform: ${(props) => props.open ? 'translateX(0)' : 'translateX(-100%)'};
    visibility: ${(props) => props.open ? 'visible' : 'hidden'};
  }

  transition: 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;  
`;

const MenuOverlay = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  z-index: 100;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
`;

const CloseButton = styled(FaTimes)`
    ${color}
    ${fontSize}
    ${display}
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;

    &:hover{
      color: ${(props) => props.theme.colors.accent};
    }
`;

const Header = ({dialog}) => {

  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  }


  return (
    <>
      <Box backgroundColor="primaryDark" marginBottom="50px">
        <PageContainer>
          <Flex height={85} alignItems="center" justifyContent="space-between">
            <Box>
              <DefaultButton 
                backgroundColor="transparent" 
                padding="0" 
                height="auto"
                onClick={handleToggleMenu}
                aria-haspopup="menu"
                aria-controls="mobile-menu"
                aria-expanded={ menuOpen ? "true" : "false" }
                role="button"
                display={['inline-block', 'none', 'none']}
              > 
                <Hamburger color="icons" fontSize="3" display={['inline-block', 'none', 'none']}/>
              </DefaultButton>
              <NavBar 
                role="menu" 
                id="mobile-menu" 
                hidden={ menuOpen ? true : false }
                open={menuOpen} 
              >
                <MenuItem 
                  to={"/"} 
                  menuOpen={menuOpen} 
                  color={["primaryText", "icons", "icons"]} 
                  fontSize="1"
                >
                    Saved Projects
                </MenuItem>
                <MenuItem 
                  to={"/"} 
                  menuOpen={menuOpen} 
                  color={["primaryText", "icons", "icons"]} 
                  fontSize="1"
                >
                  Messages
                </MenuItem>
                <MenuItem 
                  to={"/"} 
                  menuOpen={menuOpen} 
                  color={["primaryText", "icons", "icons"]} 
                  fontSize="1"
                >
                  My Profile
                </MenuItem>
                <CloseButton 
                  color="primaryText" 
                  onClick={ handleToggleMenu } 
                  fontSize={2}
                  display={['inline-block', 'none', 'none']}
                />
              </NavBar>
            </Box>
            <Flex alignItems="center">
              <Button 
                {...dialog}
                bg="accent" 
                color="icons"  
                height="auto" 
                mr="20px"
                fontSize="1"
                as={DialogDisclosure}
              >
                Create Project
              </Button>
              <Notifications color="icons" fontSize="3" />
            </Flex>
          </Flex>
        </PageContainer>
        {menuOpen && <MenuOverlay onClick={ handleToggleMenu }/>}
      </Box>
    </>
  )
}

export default Header;