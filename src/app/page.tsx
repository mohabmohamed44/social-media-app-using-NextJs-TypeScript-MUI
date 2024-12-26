import Image from "next/image";
import styles from "./page.module.css";
import Grid from '@mui/material/Grid2';
import Post from "@/Components/Post/Post";
import { Paper } from "@mui/material";
export default function Home() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid size={3}>

        </Grid>

        <Grid size={6}>
          <Paper>
            <Post/>
          </Paper>
        </Grid>

        <Grid size={3}>
        </Grid>
      </Grid>
    </>
  );
}
