import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import {SettingsRounded} from "@mui/icons-material";
import {Box, TableFooter, TablePagination,} from "@mui/material";
import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import {RolesContext} from "../../context/roleContext";
import TablePaginationActions from "../common/TableFooter";
import DataToolbar from "./DataToolbar";
import DialogUnit from "./DialogUnit";
import { useOrgUnits } from '../../context/OrgUnitContext';

export const DataTable: any = () => {

    const {page,  currentPage, setCurrentPage, size, setSize, setOrgunits} = useContext(RolesContext);
    const [openDialog, setOpenDialog] = useState(false);
    const { selectedOrgUnits } = useOrgUnits();

    const handleTypeSelect = () => {
        setOpenDialog(false);
        const orgunitIds = selectedOrgUnits.map(orgunit => orgunit.id);
        setOrgunits(orgunitIds);
    }
    // Avoid a layout jump when reaching the last page with empty rows.
    // ----does the user want this?
    // const emptyRows =
    //     currentPage > 0 ? Math.max(0, (1 + currentPage) * size - (page ? page.totalItems : 0)) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        console.log("new page:", newPage)
        setCurrentPage(newPage)
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        // setRowsPerPage(parseInt(event.target.value, 10));
        setSize(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    return (
        <Box sx={{p: 1}}>
            <DialogUnit
                onClose={handleTypeSelect}
                open={openDialog}
            />

            <TableContainer sx={{maxWidth: 1040, minWidth: 1040}} id={"rolesDataTable"}>
                <DataToolbar onShowDialog={() => setOpenDialog(true)}/>
                <Table aria-label="Roles" >
                    <TableHead sx={{ th: { fontWeight: 'bold' } }}>
                        <TableRow>
                            <TableCell align="left">Navn</TableCell>
                            <TableCell align="left">Enhet</TableCell>
                            <TableCell align="left" colSpan={2}>Brukertype</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {page?.roles?.map((role) => (
                            <TableRow
                                key={role.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="left" scope="row">{role.roleName}</TableCell>
                                <TableCell align="left">{role.organisationUnitName}</TableCell>
                                <TableCell align="left">{role.roleType} </TableCell>
                                <TableCell align="left">
                                    <IconButton aria-label="settings" id={`role-${role.id}`}
                                                component={Link} to={`info/${role.id}`}
                                    >
                                        <SettingsRounded color={"primary"}/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {/*{emptyRows > 0 && (*/}
                        {/*    <TableRow style={{ height: 73 * emptyRows }}>*/}
                        {/*        <TableCell colSpan={4} />*/}
                        {/*    </TableRow>*/}
                        {/*)}*/}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                id={"pagination"}
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                colSpan={4}
                                count={page ? page.totalItems : 0}
                                rowsPerPage={size}
                                page={currentPage}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Box>
    );
};