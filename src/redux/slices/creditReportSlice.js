import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as creditReportApi from '../../api/creditReportApi';

// Async thunks
export const uploadCreditReport = createAsyncThunk(
  'creditReports/upload',
  async (file, { rejectWithValue }) => {
    try {
      const response = await creditReportApi.uploadReport(file);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllReports = createAsyncThunk(
  'creditReports/fetchAll',
  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const response = await creditReportApi.getAllReports(page, limit);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchReportById = createAsyncThunk(
  'creditReports/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await creditReportApi.getReportById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteReport = createAsyncThunk(
  'creditReports/delete',
  async (id, { rejectWithValue }) => {
    try {
      await creditReportApi.deleteReport(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const searchReportByPAN = createAsyncThunk(
  'creditReports/searchByPAN',
  async (pan, { rejectWithValue }) => {
    try {
      const response = await creditReportApi.searchByPAN(pan);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initial state
const initialState = {
  reports: [],
  currentReport: null,
  uploadedReport: null,
  pagination: {
    page: 1,
    pages: 1,
    total: 0,
    count: 0,
  },
  loading: false,
  uploading: false,
  error: null,
  uploadSuccess: false,
};

// Slice
const creditReportSlice = createSlice({
  name: 'creditReports',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearUploadSuccess: (state) => {
      state.uploadSuccess = false;
      state.uploadedReport = null;
    },
    clearCurrentReport: (state) => {
      state.currentReport = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Upload Report
      .addCase(uploadCreditReport.pending, (state) => {
        state.uploading = true;
        state.error = null;
        state.uploadSuccess = false;
      })
      .addCase(uploadCreditReport.fulfilled, (state, action) => {
        state.uploading = false;
        state.uploadSuccess = true;
        state.uploadedReport = action.payload.data;
      })
      .addCase(uploadCreditReport.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload?.error || 'Failed to upload report';
      })
      
      // Fetch All Reports
      .addCase(fetchAllReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload.data;
        state.pagination = {
          page: action.payload.page,
          pages: action.payload.pages,
          total: action.payload.total,
          count: action.payload.count,
        };
      })
      .addCase(fetchAllReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Failed to fetch reports';
      })
      
      // Fetch Report By ID
      .addCase(fetchReportById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReportById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReport = action.payload.data;
      })
      .addCase(fetchReportById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Failed to fetch report';
      })
      
      // Delete Report
      .addCase(deleteReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = state.reports.filter(
          (report) => report._id !== action.payload
        );
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Failed to delete report';
      })
      
      // Search by PAN
      .addCase(searchReportByPAN.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchReportByPAN.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload.data;
      })
      .addCase(searchReportByPAN.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || 'Failed to search reports';
      });
  },
});

export const { clearError, clearUploadSuccess, clearCurrentReport } = 
  creditReportSlice.actions;

export default creditReportSlice.reducer;