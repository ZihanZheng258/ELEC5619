import './index.less'
import React, {useEffect, useMemo, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import MaterialReactTable from 'material-react-table';
//Material-UI Imports
import {Button, ListItemIcon, MenuItem, TextField,} from '@mui/material';

import {DownloadOutlined, EditOutlined} from "@ant-design/icons";
//Date Picker Imports
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
//Icons Imports
import {DeleteForeverOutlined, VisibilityOutlined} from '@mui/icons-material';
import api from "../../../api"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const DiscussionLiked = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([]);

    const columns = useMemo(() =>
        [
            {
                id: 'id', hide: true
            },

            {
                accessorKey: 'title', //id is still required when using accessorFn instead of accessorKey
                header: 'Title', enableClickToCopy: true, size: 300,

            }, {
            accessorKey: 'content', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true, header: 'Description', size: 300,
        },

            {
                accessorKey: 'jsonCategory.content', enableClickToCopy: true, header: 'Category', size: 200,

            }, {
            accessorKey: 'viewNumber', //hey a simple column for once
            header: '#Views', size: 50,
        }, {
            accessorKey: 'likeNumber', //hey a simple column for once
            header: '#Likes', size: 50,
        },{
            accessorKey: 'commentNumber', //hey a simple column for once
            header: '#Comments', size: 50,
        },

            {
                accessorFn: (row) => new Date(row.createDate), //convert to Date for sorting and filtering
                id: 'createDate',
                header: 'Create Date',
                filterFn: 'lessThanOrEqualTo',
                sortingFn: 'datetime',
                Cell: ({cell}) => cell.getValue()?.toLocaleDateString(), //render Date as a string
                Header: ({column}) => <em>{column.columnDef.header}</em>, //custom header markup
                //Custom Date Picker Filter from @mui/x-date-pickers
                Filter: ({column}) => (<LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        onChange={(newValue) => {
                            column.setFilterValue(newValue);
                        }}
                        renderInput={(params) => (<TextField
                            {...params}
                            helperText={'Filter Mode: Lesss Than'}
                            sx={{minWidth: '120px'}}
                            variant="standard"
                        />)}
                        value={column.getFilterValue()}
                    />
                </LocalizationProvider>),
            }], [],);

    useEffect(() => {
        api.getSelf()
            .then((response)=>{
                api.getDiscussionLikedbyUser(response.data.data.user.nickName)
                    .then((res) => {
                        setData(res.data.data.discussions)
                    })
            })

    }, []);


    return (<div>
            <h1 style={{fontSize: "2em"}}>Discussion Favorites</h1>
            <MaterialReactTable
                options={{}}
                columnsButton={false}
                columns={columns}
                data={data}
                enableColumnFilterModes
                enableGrouping
                enableHiding={false}
                enableColumnFilters={false}
                enableColumnOrdering={false}
                enableRowActions
                initialState={{columnVisibility: {id: false}, showColumnFilters: false,}}
                positionToolbarAlertBanner="bottom"
                renderRowActionMenuItems={({closeMenu, row, table}) => [<MenuItem
                    key={0}
                    onClick={() => {
                        // View profile logic...
                        navigate("/discussion/" + row.original.id)
                    }}
                    sx={{m: 0}}
                >
                    <ListItemIcon>
                        <VisibilityOutlined/>
                    </ListItemIcon>
                    View
                </MenuItem>


                ]
                }

            />

        </div>

    );
};
export default DiscussionLiked
