import React from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import BarChartIcon from '@mui/icons-material/BarChart';
import Logout from '../components/auth/Logout';

interface PayoutData {
  author: string;
  articles: number;
  payoutPerArticle: number;
  totalPayout: number;
}

const dummyData: PayoutData[] = [
  { author: 'John ', articles: 12, payoutPerArticle: 10, totalPayout: 120 },
  { author: 'Jane ', articles: 8, payoutPerArticle: 15, totalPayout: 120 },
  { author: 'Mike ', articles: 15, payoutPerArticle: 12, totalPayout: 180 },
  { author: 'Emily ', articles: 5, payoutPerArticle: 20, totalPayout: 100 },
  { author: 'Robert ', articles: 10, payoutPerArticle: 14, totalPayout: 140 },
  { author: 'Anna ', articles: 20, payoutPerArticle: 18, totalPayout: 360 },
  { author: 'Chris ', articles: 7, payoutPerArticle: 25, totalPayout: 175 },
  { author: 'Sara ', articles: 6, payoutPerArticle: 30, totalPayout: 180 },
  { author: 'Peter ', articles: 18, payoutPerArticle: 16, totalPayout: 288 },
  { author: 'Gray', articles: 9, payoutPerArticle: 22, totalPayout: 198 },
];

const Profile = () => {
  const theme = useTheme();

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Payout Report', 14, 22);

    const tableColumn: string[] = [
      'Author',
      'Articles',
      'Payout per Article ($)',
      'Total Payout ($)',
    ];
    const tableRows: string[][] = [];

    dummyData.forEach((payout) => {
      tableRows.push([
        payout.author,
        payout.articles.toString(),
        payout.payoutPerArticle.toString(),
        payout.totalPayout.toString(),
      ]);
    });

    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save('payout_report.pdf');
  };

  const exportToCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Author,Articles,Payout per Article,Total Payout']
        .concat(
          dummyData.map(
            (payout) =>
              `${payout.author},${payout.articles},${payout.payoutPerArticle},${payout.totalPayout}`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'payout_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box
      sx={{
        px: 4,
        py: 2,
        backgroundColor: '#f3f4f6', // Light grey background for better contrast
        minHeight: '100vh',
      }}
    >
      {/* Header */}
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        sx={{
          mb: 4,
          fontWeight: 'bold',
          color: '#111827',
          textTransform: 'uppercase',
        }}
      >
        Payout Dashboard
      </Typography>

      {/* Charts Section */}
      <Grid container spacing={3} justifyContent="center" sx={{ mb: 4 }}>
        {/* Vertical Bar Chart */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: '#ffffff',
              height: 400, // Equal height for charts
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                align="center"
                gutterBottom
                sx={{ color: '#111827', fontWeight: 'bold' }}
              >
                <BarChartIcon sx={{ mr: 1 }} />
                Vertical Bar Chart
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  height: 300,
                }}
              >
                {dummyData.map((data) => (
                  <Box
                    key={data.author}
                    sx={{
                      flex: 0.3,
                      mx: 1,
                      backgroundColor: '#2563eb',
                      height: `${data.totalPayout / 2}px`,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      color: 'white',
                      borderRadius: 1,
                      boxShadow: 2,
                      transition: 'transform 0.3s',
                      '&:hover': { transform: 'scale(1.05)', backgroundColor: '#1e40af' },
                    }}
                  >
                    <Typography variant="caption" sx={{ padding: 1, fontWeight: 'bold' }}>
                      ${data.totalPayout}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, }}>
                {dummyData.map((data) => (
                  <Typography key={data.author} variant="body2" sx={{ color: '#6b7280', fontSize: 12 }}>
                    {data.author}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Horizontal Bar Chart */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: '#ffffff',
              height: 400, // Equal height for charts
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                align="center"
                gutterBottom
                sx={{ color: '#111827', fontWeight: 'bold' }}
              >
                <BarChartIcon sx={{ mr: 1 }} />
                Horizontal Bar Chart
              </Typography>
              <Box sx={{ mt: 2 }}>
                {dummyData.map((data) => (
                  <Box
                    key={data.author}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      my: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ minWidth: '100px', color: '#6b7280', fontWeight: 'bold' }}
                    >
                      {data.author}
                    </Typography>
                    <Box
                      sx={{
                        height: '20px',
                        backgroundColor: '#10b981',
                        width: `${data.totalPayout / 2}px`,
                        borderRadius: '4px',
                        boxShadow: 1,
                      }}
                    ></Box>
                    <Typography variant="caption" sx={{ ml: 2, color: '#111827' }}>
                      ${data.totalPayout}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Table */}
      <Card sx={{ borderRadius: 2, boxShadow: 3, backgroundColor: '#ffffff', mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ color: '#111827', fontWeight: 'bold' }}>
            Payout Details
          </Typography>
          <Box sx={{ overflow: 'hidden' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
                color: '#111827',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#2563eb', color: 'white' }}>
                  <th style={{ padding: '12px' }}>Author</th>
                  <th style={{ padding: '12px' }}>Articles</th>
                  <th style={{ padding: '12px' }}>Payout per Article ($)</th>
                  <th style={{ padding: '12px' }}>Total Payout ($)</th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((data, index) => (
                  <tr
                    key={index}
                    style={{
                      borderBottom: '1px solid #e5e7eb',
                      backgroundColor: index % 2 === 0 ? '#f9fafb' : '#ffffff',
                    }}
                  >
                    <td style={{ padding: '12px' }}>{data.author}</td>
                    <td style={{ padding: '12px' }}>{data.articles}</td>
                    <td style={{ padding: '12px' }}>{data.payoutPerArticle}</td>
                    <td style={{ padding: '12px' }}>{data.totalPayout}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </CardContent>
      </Card>

      {/* Export Buttons */}
      <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
        <Grid item>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#2563eb',
              textTransform: 'none',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#1e40af' },
            }}
            startIcon={<PictureAsPdfIcon />}
            onClick={exportToPDF}
          >
            Export as PDF
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#10b981',
              textTransform: 'none',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#047857' },
            }}
            startIcon={<DescriptionIcon />}
            onClick={exportToCSV}
          >
            Export as CSV
          </Button>
        </Grid>
      </Grid>

    </Box>
  );
};

export default Profile;
