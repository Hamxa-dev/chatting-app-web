import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  CssBaseline,
  Paper,
  Avatar,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  LockOutlined as LockOutlinedIcon,
  EmailOutlined as EmailOutlinedIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

const Login = () => {
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!password) {
      setError("Password is required");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Firebase Authentication Error:", errorCode, errorMessage);
      setError(errorMessage); // Display Firebase error message
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Avatar
          sx={{
            margin: "auto",
            marginBottom: 2,
            width: 64,
            height: 64,
          }}
          alt="Profile"
          src="https://play-lh.googleusercontent.com/JRZn6KdzogK3SaavPNmkHHRVgQ7Jm59OisHAnf9j3Wr8kfQEKscj0Qj5K_0OrGxDe_w=w600-h300-pc0xffffff-pd"
        />
        <Typography component="h1" variant="h5" align="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                id="email"
                name="email"
                type="email"
                label="Email"
                autoComplete="email"
                required
                InputProps={{
                  startAdornment: <EmailOutlinedIcon />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                autoComplete="current-password"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2 }}
          >
            Sign In
          </Button>
          {error && (
            <Typography variant="body2" color="error" align="center">
              {error}
            </Typography>
          )}
        </form>
        <Grid container justifyContent="center">
          <Grid item>
            <Link to="/register" variant="body2">
              Don't have an account? Register
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
