import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import { IDevice } from '@/interfaces/IDevice';

interface Props {
  rows: IDevice[] | null;
  columns: GridColDef[];
  onPageChange: (newPage: number) => void;
  currentPage: number;
  rowCount: number | undefined;
  loading: Boolean;
  rowSelectionModel: GridRowSelectionModel;
  handleRowSelectionChange: (newRowSelectionModel: GridRowSelectionModel) => void;
}

interface MyGridPageChangeParams {
  page: number;
}

const TableComponent: React.FC<Props> = ({
  loading,
  rows,
  columns,
  onPageChange,
  currentPage,
  rowSelectionModel,
  rowCount,
  handleRowSelectionChange,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5, flexWrap: 'wrap' }}>
      <div
        style={{
          height: 400,
          width: '100%',
          borderRadius: '8px',
          backgroundColor: 'white',
        }}
      >
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
            checkboxSelection
            pagination
            {...({ rowsPerPageOptions: [10, 25] } as any)}
            pageSizeOptions={[5, 10, 100]}
            page={currentPage}
            pageSize={10}
            onPageChange={(params: MyGridPageChangeParams) => onPageChange(params.page)}
            rowCount={rowCount}
            paginationMode='server'
            columns={columns}
            rows={rows || []}
            onRowSelectionModelChange={handleRowSelectionChange}
            rowSelectionModel={rowSelectionModel}
          />
        )}
      </div>
    </Box>
  );
};

export default TableComponent;
