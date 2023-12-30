import { selectFilter } from "red/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectPhoneBookValue } from "red/phoneBook/phoneSelector";
import { getContactsThunk } from "services/fetchContacts";
import { useEffect, useState } from "react";
import * as React from 'react';
import { Box, List, Typography, Avatar } from "@mui/material";
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { Loader } from "components/Loader/Loader";
import { ContactItem } from "./ContactItem";
import { avatarStyle } from "pages/StylePages";
import { boxListStyle } from "./StyleContactsList";

export const ContactsList = () => {
    const dispatch = useDispatch();
    const [load, setLoad] = useState(true);
    const phoneBook = useSelector(selectPhoneBookValue);
    const filterPhoneBook = useSelector(selectFilter);

    useEffect(() => {
        setLoad(false);
    }, [])

    useEffect(() => {
        dispatch(getContactsThunk())
    }, [dispatch]);

    const lowerFilter = filterPhoneBook.toLowerCase();
    const visibleContacts = phoneBook.filter(({ name }) =>
        (name.toLowerCase().includes(lowerFilter)));
    
    return (
        <Box sx={boxListStyle}>
            <Avatar sx={avatarStyle}>
                <ImportContactsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Your Contacts
            </Typography>
            {load && <Loader/>}
            <List sx={{ width: 396 }}>
                {visibleContacts.map((contact) =>
                    <ContactItem contact={contact} key={contact.id} />
                )}
            </List>
        </Box>
    );
};