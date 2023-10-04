import { Box, CircularProgress } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';

import { IDevices } from 'interfaces/IDevices';

interface Props {
  rows: IDevices[] | null;
  columns: GridColDef[];
  onPageChange: (newPage: number) => void;
  currentPage: number;
  loading: Boolean;
}

interface MyGridPageChangeParams {
  page: number;
}

const TableComponent: React.FC<Props> = ({ loading, rows, columns, onPageChange, currentPage }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5, flexWrap: 'wrap' }}>
      <div style={{ height: 400, width: '100%', maxWidth: 1100, backgroundColor: 'white' }}>
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            pagination
            {...({ rowsPerPageOptions: [10, 25] } as any)}
            pageSizeOptions={[5, 10, 100]}
            page={currentPage}
            pageSize={10}
            onPageChange={(params: MyGridPageChangeParams) => onPageChange(params.page)}
            rowCount={rows?.length}
            paginationMode='server'
            rows={rows || []}
            columns={columns}
          />
        )}
      </div>
    </Box>
  );
};

export default TableComponent;
