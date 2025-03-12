import React, {useState} from 'react'
import { useProtectedPage } from '../../hooks/useProtectedPage'
import { useRequestData } from '../../hooks/useRequestData'
import { Container, Grid, Paper, Typography, Button } from "@mui/material";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as XLSX from "xlsx";
import TransactionCard from './transactionCard/TransactionCard';


export default function AdminPage() {
  useProtectedPage()
  const {data, isLoading} = useRequestData("/transaction")
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState([]);


  const handleFileUpload = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      readExcel(selectedFile);
    }
  };

  const readExcel = (file) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = (e) => {
      if (!e.target?.result) return;
      const buffer = e.target.result;
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setFileData(jsonData);
    };
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 4, mb: 2, textAlign: "center" }}>
        Painel Administrativo
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Lista de Dados</Typography>
            {isLoading && <p>Carregando...</p>}
            <ul>
            {data && data.length > 0 ? 
            data.map((t) => <TransactionCard key={t.id} transaction={t} />) 
            : 
            <p>Nenhuma transação encontrada.</p>}
            </ul>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">Upload de Arquivo Excel</Typography>
            <Button
              variant="contained"
              component="label"
              // startIcon={<CloudUploadIcon />
              sx={{ mt: 2 }}
            >
              Escolher Arquivo
              <input
                type="file"
                hidden
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
              />
            </Button>
            {file && <Typography sx={{ mt: 1 }}>Arquivo: {file.name}</Typography>}
          </Paper>
        </Grid>
      </Grid>

      {/* Exibição dos dados do arquivo Excel */}
      {fileData.length > 0 && (
        <Paper sx={{ mt: 3, p: 3 }}>
          <Typography variant="h6">Pré-visualização do Excel</Typography>
          <ul>
            {fileData.slice(0, 5).map((row, index) => (
              <li key={index}>{JSON.stringify(row)}</li>
            ))}
          </ul>
        </Paper>
      )}
    </Container>
  )
}

