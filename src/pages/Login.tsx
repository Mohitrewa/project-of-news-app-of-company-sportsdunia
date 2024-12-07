import { Box, Tab, Tabs, Typography, Paper } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";
import AuthContainer from "../components/auth/AuthContainer";
import Center from "../components/utils/Center";

interface Props { }

const tabIdToURL: { [id: number]: string } = {
  0: "login",
  1: "register",
};

const Login = ({ }: Props) => {
  // getting and setting URL params
  const [searchParams, setSearchParams] = useSearchParams();

  // get action from URL
  const action: string = searchParams.get("action") || "login";

  // used to set initial state
  let indexFromUrl = 0;
  if (action === "register") {
    indexFromUrl = 1;
  }

  // handle Tab Panel
  const [value, setValue] = React.useState(indexFromUrl);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const action = tabIdToURL[newValue];
    setSearchParams({ action });
  };

  return (
    <Center height={90}>
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 480,
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
          backgroundColor: "#2d3748",
          color: "#f5f5f5",
        }}
      >
        {/* Header Tabs */}
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "#4a5568",
            backgroundColor: "#2d3748",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            TabIndicatorProps={{ style: { backgroundColor: "#10b981" } }}
          >
            <Tab
              sx={{
                px: { lg: 20, xs: 6 },
                fontWeight: "bold",
                color: value === 0 ? "#10b981" : "#9ca3af",
                textTransform: "capitalize",
              }}
              label="Login"
            />
            <Tab
              sx={{
                px: { lg: 16, xs: 6 },
                fontWeight: "bold",
                color: value === 1 ? "#10b981" : "#9ca3af",
                textTransform: "capitalize",
              }}
              label="Register"
            />
          </Tabs>
        </Box>

        {/* Tab Panels */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            px: 4,
            py: 6,
          }}
        >
          {/* Login */}
          <TabPanel value={value} index={0}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", mb: 2, color: "#f5f5f5" }}
            >
              Welcome Back!
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 4, textAlign: "center", color: "#9ca3af" }}
            >
              Please log in to access your dashboard.
            </Typography>
            <AuthContainer />
          </TabPanel>

          {/* Register */}
          <TabPanel value={value} index={1}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", mb: 2, color: "#f5f5f5" }}
            >
              Create Your Account
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 4, textAlign: "center", color: "#9ca3af" }}
            >
              Get started by creating an account below.
            </Typography>
            <AuthContainer />
          </TabPanel>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            textAlign: "center",
            py: 2,
            backgroundColor: "#374151",
            borderTop: "1px solid #374151",
          }}
        >
        </Box>
      </Paper>
    </Center>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, value, index }: TabPanelProps) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box sx={{ width: "100%" }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
};

export default Login;
